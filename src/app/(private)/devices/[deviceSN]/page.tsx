'use client';

import type { Device } from '@/types/types';
import { RootState, useAppSelector } from '@/store';
import { useCallback, useEffect, useState } from 'react';

import Comments from './Comments';
import { Dropper, Paperscent, parseToDropper, parseToPaperscent } from '@/types/devices';
import { fetchDevice } from '@/services/api';

export default function DevicePage({ params }: { params: { deviceSN: string } }) {
  const [ device, setDevice ] = useState<Dropper | Paperscent | null>(null);
  const jwt = useAppSelector((state: RootState) => state.user.jwt);

  const _fetchDevice = useCallback(async () => {
    if (!jwt) return;
    const data = await fetchDevice(jwt, params.deviceSN);
    const device = data.data as Device;
    if (device.attributes.type === 'Dropper') {
      setDevice(parseToDropper(device));
    } else if (device.attributes.type === 'Paperscent') {
      setDevice(parseToPaperscent(device));
    } else {
      alert(`Unknown device type ${device.attributes.type}`);
    }
  }, [ params.deviceSN ]);

  useEffect(() => {
    _fetchDevice();
  }, []);

  if (!device) return null;
  return (
    <div className={'p-8 h-full box-border w-[1200px]'}>
      <div className={'pl-5 max-h-[25%]'}>
        <h2 className={'text-2xl font-bold mb-7'}>Device details (id: {device.id})</h2>
        <p>Type : {device.attributes.type}</p>
        <p>Serial number : {device.attributes.serialNumber}</p>
        <p>Pump dose : {device.properties.pumpDose}</p>
        <p>Nozzle : {device.properties.nozzle}</p>
        <p>Product level : {device.properties.productLevel}</p>
        <p>Number of tests : {device.properties.numberOfTests}</p>
        {device.attributes.type === 'Paperscent' && <p>Paper level : {(device as Paperscent).properties.paperLevel}</p>}
      </div>
      <Comments deviceId={device.id} />
    </div>
  )
}
