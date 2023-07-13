import DevicesList from './DevicesList';
import NewDeviceButton from './NewDeviceButton';

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Devices({ searchParams }: PageProps) {
  const showCreateModal = searchParams?.create === 'true';
  return (
    <div className={'p-5'}>
      <NewDeviceButton showCreateModal={showCreateModal} />
      <h2 className={'mt-10 font-bold text-2xl'}>Devices List</h2>
      <DevicesList />
    </div>
  )
}
