'use client';

import type { Company } from '@/app/types';
import { RootState, useAppSelector } from '@/store';
import { useCallback, useEffect, useState } from 'react';

export default function CompanyPage({ params }: { params: { companyId: string } }) {
  const [ company, setCompany ] = useState<Company | null>(null);
  const jwt = useAppSelector((state: RootState) => state.user.jwt);

  const fetchCompany = useCallback(async () => {
    const result = await fetch(`http://localhost:1337/api/companies/${params.companyId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setCompany((await result.json()).data as Company);
  }, [ params.companyId ]);

  useEffect(() => {
    fetchCompany();
  }, []);

  if (!company) return null;
  return (
    <div>
      <p>{company.attributes.name}</p>
    </div>
  )
}
