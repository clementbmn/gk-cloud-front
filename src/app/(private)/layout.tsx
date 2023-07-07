import Sidebar from '@/components/Sidebar';
import { ReactNode } from 'react';

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <div className={'flex flex-row h-full w-full'}>
      <Sidebar />
      {children}
    </div>
    )

}
