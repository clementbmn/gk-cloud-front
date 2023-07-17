'use client';

import { RootState, useAppSelector } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { replace } = useRouter();
  const jwt = useAppSelector((state: RootState) => state.user.jwt);

  useEffect(() => {
    if (!jwt) {
      replace('/login');
    } else {
      replace('/dashboard');
    }
  }, [ jwt ]);

  return (
    <div>
      <p>Bonjour</p>
    </div>
  )
}
