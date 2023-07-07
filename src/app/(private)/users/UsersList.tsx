'use client';

import { RootState, useAppSelector } from '@/store';
import type { User } from '@/app/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function UsersList() {
  const jwt = useAppSelector((state: RootState) => state.user.jwt);
  const [ users, setUsers ] = useState<[User] | null>(null);

  const fetchUsers = async () => {
    const result = await fetch('http://localhost:1337/api/users', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setUsers(await result.json());
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    users ? (
      <ul>
        {users?.map((user: User) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.firstname} {user.lastname}</Link>
          </li>
        ))}
      </ul>
    ) : null
  );
};
