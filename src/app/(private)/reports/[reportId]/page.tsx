'use client';

import type { Report } from '@/app/types';
import { RootState, useAppSelector } from '@/store';
import { useCallback, useEffect, useState } from 'react';

export default function ReportPage({ params }: { params: { reportId: string } }) {
  const [ report, setReport ] = useState<Report | null>(null);
  const jwt = useAppSelector((state: RootState) => state.user.jwt);

  const fetchReport = useCallback(async () => {
    const result = await fetch(`http://localhost:1337/api/reports/${params.reportId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setReport((await result.json()).data as Report);
  }, [ params.reportId ]);

  useEffect(() => {
    fetchReport();
  }, []);

  if (!report) return null;
  return (
    <div>
      <p>{report.attributes.data}</p>
    </div>
  )
}
