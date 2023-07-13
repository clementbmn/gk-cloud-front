'use client';

import { RootState, useAppSelector } from '@/store';
import type { Company } from '@/types/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CompaniesList() {
  const jwt = useAppSelector((state: RootState) => state.user.jwt);
  const [ companies, setCompanies ] = useState<[Company] | null>(null);

  const fetchCompanies = async () => {
    const result = await fetch('http://localhost:1337/api/companies', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setCompanies((await result.json()).data);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    companies ? (
      <ul>
        {companies?.map((company: Company) => (
          <li key={company.id}>
            <Link href={`/companies/${company.id}`}>{company.attributes.name}</Link>
          </li>
        ))}
      </ul>
    ) : null
  );
};
