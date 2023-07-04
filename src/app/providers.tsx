import { PropsWithChildren } from 'react';

import { ReduxProvider } from '@/store';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  )
}
