'use client';

import { RootState, useAppSelector } from '@/store';
import type { Device } from '@/types/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { IoIosClose } from 'react-icons/io';

export default function NewDeviceButton({ showCreateModal }: { showCreateModal: boolean }) {
  const jwt = useAppSelector((state: RootState) => state.user.jwt);
  const [ devices, setDevices ] = useState<[Device] | null>(null);

  const createDevice = async (data: object) => {
    const result = await fetch('http://localhost:1337/api/devices', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    });
  };

  useEffect(() => {
    createDevice({});
  }, []);

  return (
    <>
      <Link href={'?create=true'} className={'bg-blue-950 rounded-md p-2 hover:cursor-pointer text-lg text-white'}>
        + Add device
      </Link>
      <Modal
        isOpen={showCreateModal}
        className={'flex content-center justify-center h-full w-full p-10'}
      >
        <div className={'relative shadow-2xl bg-white w-2/5 rounded-lg p-5'}>
          <h3>Create new device</h3>
          <button>Create device</button>
          <Link href={'?'} className={'absolute top-2 right-2 cursor-pointer'}>
            <IoIosClose size={40} />
          </Link>
        </div>
      </Modal>
    </>
  );
};
