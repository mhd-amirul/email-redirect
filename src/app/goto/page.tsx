'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function RedirectComponent() {
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

export default function GotoPage() {
  return (
    <Suspense fallback={null}>
      <RedirectComponent />
    </Suspense>
  );
}

