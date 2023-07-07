'use client';

import { RootState, useAppSelector } from '@/store';
import type { Device } from '@/app/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DevicesList() {
  const jwt = useAppSelector((state: RootState) => state.user.jwt);
  const [ devices, setDevices ] = useState<[Device] | null>(null);

  const fetchDevices = async () => {
    const result = await fetch('http://localhost:1337/api/devices', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setDevices((await result.json()).data);
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    devices ? (
      <ul>
        {devices?.map((device: Device) => (
          <li key={device.id}>
            <Link href={`/devices/${device.attributes.serialNumber}`}>{device.attributes.serialNumber}</Link>
          </li>
        ))}
      </ul>
    ) : null
  );
};
