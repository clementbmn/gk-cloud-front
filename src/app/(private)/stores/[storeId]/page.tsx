'use client';

import type { Store } from '@/app/types';
import { RootState, useAppSelector } from '@/store';
import { useCallback, useEffect, useState } from 'react';

export default function StorePage({ params }: { params: { storeId: string } }) {
  const [ store, setStore ] = useState<Store | null>(null);
  const jwt = useAppSelector((state: RootState) => state.user.jwt);

  const fetchStore = useCallback(async () => {
    const result = await fetch(`http://localhost:1337/api/stores/${params.storeId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setStore((await result.json()).data as Store);
  }, [ params.storeId ]);

  useEffect(() => {
    fetchStore();
  }, []);

  if (!store) return null;
  return (
    <div>
      <p>{store.attributes.name}</p>
    </div>
  )
}
