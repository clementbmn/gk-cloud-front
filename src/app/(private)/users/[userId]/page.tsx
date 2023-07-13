'use client';

import type { User } from '@/types/types';
import { RootState, useAppSelector } from '@/store';
import { useCallback, useEffect, useState } from 'react';

export default function UserPage({ params }: { params: { userId: string } }) {
  const [ user, setUser ] = useState<User | null>(null);
  const jwt = useAppSelector((state: RootState) => state.user.jwt);

  const fetchUser = useCallback(async () => {
    const result = await fetch(`http://localhost:1337/api/users/${params.userId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setUser((await result.json()) as User);
  }, [ params.userId ]);

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return null;
  return (
    <div>
      <p>{user.id}</p>
      <p>{user.email}</p>
      <p>{user.firstname} {user.lastname}</p>
    </div>
  )
}
