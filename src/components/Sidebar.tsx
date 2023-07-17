import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

const routes = [
  { name: 'Dashboard', path: '/' },
  { name: 'Devices', path: '/devices' },
  { name: 'Companies', path: '/companies' },
  { name: 'Reports', path: '/reports' },
  { name: 'Stores', path: '/stores' },
  { name: 'Users', path: '/users' },
];

export default function Sidebar() {

  return (
    <nav className={'bg-blue-50 h-full min-w-[200px] pl-[20px] pt-[20px]'}>
      <h2 className={'text-2xl font-bold mb-5'}>GK Concept</h2>
      <ul>
        {routes.map(({ name, path}: { name: string, path: string }) => (
          <li className={'mb-3'} key={name}>
            <Link href={path}>{name}</Link>
          </li>
        ))}
      </ul>
      <LogoutButton />
    </nav>
  )
}
