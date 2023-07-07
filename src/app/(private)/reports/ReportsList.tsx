'use client';

import { RootState, useAppSelector } from '@/store';
import type { Report } from '@/app/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ReportsList() {
  const jwt = useAppSelector((state: RootState) => state.user.jwt);
  const [ reports, setReports ] = useState<[Report] | null>(null);

  const fetchReports = async () => {
    const result = await fetch('http://localhost:1337/api/reports', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setReports((await result.json()).data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    reports ? (
      <ul>
        {reports?.map((report: Report) => (
          <li key={report.id}>
            <Link href={`/reports/${report.id}`}>{report.id}</Link>
          </li>
        ))}
      </ul>
    ) : null
  );
};
