'use client';

import type { Device } from '@/app/types';
import { RootState, useAppSelector } from '@/store';
import { useCallback, useEffect, useState } from 'react';

export default function DevicePage({ params }: { params: { deviceSN: string } }) {
  const [ device, setDevice ] = useState<Device | null>(null);
  const jwt = useAppSelector((state: RootState) => state.user.jwt);

  const fetchDevice = useCallback(async () => {
    const result = await fetch(`http://localhost:1337/api/devices/${params.deviceSN}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setDevice((await result.json()).data as Device);
  }, [ params.deviceSN ]);

  useEffect(() => {
    fetchDevice();
  }, []);

  if (!device) return null;
  return (
    <div>
      <p>{device.attributes.serialNumber}</p>
    </div>
  )
}
