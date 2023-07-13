'use client';

import { useAppDispatch } from '@/store';
import { logout } from '@/store/features/user';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const { replace } = useRouter();
  const handleClick = () => {
    dispatch(logout());
    replace('/login');
  }

  return (
    <div className={'absolute bottom-[20px]'}>
      <p className={'underline font-thin decoration-1'} onClick={handleClick}>Déconnexion</p>
    </div>
  )
}
