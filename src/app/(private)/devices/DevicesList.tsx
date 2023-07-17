'use client';

import { RootState, useAppSelector } from '@/store';
import type { Device } from '@/types/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchDevices } from '@/services/api';

export default function DevicesList() {
  const jwt = useAppSelector((state: RootState) => state.user.jwt);
  const [ devices, setDevices ] = useState<[Device] | null>(null);

  const _fetchDevices = async () => {
    if (!jwt) return;
    const data = await fetchDevices(jwt);
    setDevices(data.data);
  };

  useEffect(() => {
    _fetchDevices();
  }, []);

  return (
    devices ? (
      <ul className={'mt-7'}>
        {devices?.map((device: Device) => (
          <li key={device.id}>
            <Link href={`/devices/${device.attributes.serialNumber}`}>{device.attributes.serialNumber}</Link>
          </li>
        ))}
      </ul>
    ) : null
  );
};
