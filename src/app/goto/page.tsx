'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function GotoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const link = searchParams.get('link');

  useEffect(() => {
    if (!link) {
      router.push('/');
      return;
    }

    // Decode the link and redirect immediately
    window.location.href = decodeURIComponent(link);
  }, [link, router]);

  return null;
}

