'use client';

import type { Device } from '@/types/types';
import { RootState, useAppSelector } from '@/store';
import { useCallback, useEffect, useState } from 'react';

import Comments from './Comments';
import { Dropper, Paperscent, parseToDropper, parseToPaperscent } from '@/types/devices';

export default function DevicePage({ params }: { params: { deviceSN: string } }) {
  const [ device, setDevice ] = useState<Dropper | Paperscent | null>(null);
  const jwt = useAppSelector((state: RootState) => state.user.jwt);

  const fetchDevice = useCallback(async () => {
    const result = await fetch(`http://localhost:1337/api/devices/${params.deviceSN}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const device = (await result.json()).data as Device;
    if (device.attributes.type === 'Dropper') {
      setDevice(parseToDropper(device));
    } else if (device.attributes.type === 'Paperscent') {
      setDevice(parseToPaperscent(device));
    } else {
      alert(`Unknown device type ${device.attributes.type}`);
    }
  }, [ params.deviceSN ]);

  useEffect(() => {
    fetchDevice();
  }, []);

  if (!device) return null;
  return (
    <div className={'p-5'}>
      <h2 className={'text-2xl font-bold mb-7'}>Device details (id: {device.id})</h2>
      <p>Serial number : {device.attributes.serialNumber}</p>
      <p>Pump dose : {device.properties.pumpDose}</p>
      <p>Nozzle : {device.properties.nozzle}</p>
      <p>Product level : {device.properties.productLevel}</p>
      <p>Number of tests : {device.properties.numberOfTests}</p>
      {device.attributes.type === 'Paperscent' && <p>Paper level : {(device as Paperscent).properties.paperLevel}</p>}
      <Comments deviceId={device.id} />
    </div>
  )
}
