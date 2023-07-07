'use client';

import { useAppDispatch } from '@/store';
import { logout } from '@/store/features/user';

export default function LogoutButton() {
  const dispatch = useAppDispatch();

  return (
    <div className={'absolute bottom-[20px]'}>
      <p className={'underline font-thin decoration-1'} onClick={() => dispatch(logout())}>Déconnexion</p>
    </div>
  )
}
