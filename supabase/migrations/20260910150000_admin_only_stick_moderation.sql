-- ============================================================
-- Admin-only stick moderation
-- ============================================================
-- New sticks no longer require community votes or proximity
-- validation. They stay pending until a moderator decides.
-- The existing client-facing function signatures are preserved.

-- ============================================================
-- Stick creation: remove proximity requirement
-- ============================================================

create or replace function private.create_stick_nearby(
  p_latitude double precision,
  p_longitude double precision,
  p_description text,
  p_photo_path text,
  p_origin_type text,
  p_user_latitude double precision,
  p_user_longitude double precision
)
returns public.sticks
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid;
  v_stick public.sticks;
begin
  v_user_id := auth.uid();

  if v_user_id is null then
    raise exception 'Utilisateur non authentifié';
  end if;

  if p_origin_type not in ('seen', 'pasted') then
    raise exception 'Origine du stick invalide';
  end if;

  if p_latitude is null or p_longitude is null then
    raise exception 'Position du stick invalide';
  end if;

  insert into public.sticks (
    latitude,
    longitude,
    description,
    photo_path,
    user_id,
    origin_type,
    moderation_status
  )
  values (
    p_latitude,
    p_longitude,
    p_description,
    p_photo_path,
    v_user_id,
    p_origin_type,
    'pending'
  )
  returning * into v_stick;

  return v_stick;
end;
$$;

-- ============================================================
-- One moderator decision = approved or rejected
-- ============================================================

create or replace function public.moderate_pending_stick(
  p_stick_id uuid,
  p_status text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'Utilisateur non authentifié';
  end if;

  if not exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  ) then
    raise exception 'Accès réservé aux modérateurs';
  end if;

  if p_status not in ('approved', 'rejected') then
    raise exception 'Statut de modération invalide';
  end if;

  update public.sticks
  set moderation_status = p_status
  where id = p_stick_id
    and moderation_status = 'pending';

  if not found then
    raise exception 'Stick introuvable ou déjà modéré';
  end if;
end;
$$;

revoke all on function public.moderate_pending_stick(uuid, text)
from public, anon, authenticated;

grant execute on function public.moderate_pending_stick(uuid, text)
to authenticated;

-- ============================================================
-- Disable the old community validation RPC
-- ============================================================
-- It is intentionally kept for migration compatibility but can no
-- longer be called by normal authenticated clients. The old trigger
-- remains harmless because the new moderation flow does not create
-- validation votes.

revoke execute on function public.vote_on_stick_nearby(
  uuid,
  text,
  double precision,
  double precision
) from public, anon, authenticated;

revoke execute on function private.vote_on_stick_nearby(
  uuid,
  text,
  double precision,
  double precision
) from public, anon, authenticated;

-- Existing sticks that reached the old 3-vote review stage are
-- returned to the new moderator queue so none are stranded.
update public.sticks
set moderation_status = 'pending'
where moderation_status = 'review';
