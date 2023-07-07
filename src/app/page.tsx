'use client';

import { RootState, useAppSelector } from '@/store';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { replace } = useRouter();
  const jwt = useAppSelector((state: RootState) => state.user.jwt);
  if (!jwt) {
    replace('/login');
  } else {
    replace('/dashboard');
  }
  return (
    <div>
      <p>Bonjour</p>
    </div>
  )
}
