'use client';

import { RootState, useAppSelector } from '@/store';
import type { Store } from '@/app/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function StoresList() {
  const jwt = useAppSelector((state: RootState) => state.user.jwt);
  const [ stores, setStores ] = useState<[Store] | null>(null);

  const fetchStores = async () => {
    const result = await fetch('http://localhost:1337/api/stores', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setStores((await result.json()).data);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    stores ? (
      <ul>
        {stores?.map((store: Store) => (
          <li key={store.id}>
            <Link href={`/stores/${store.id}`}>{store.attributes.name}</Link>
          </li>
        ))}
      </ul>
    ) : null
  );
};
