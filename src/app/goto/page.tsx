'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function RedirectComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Get email address - accept both 'email' and 'to' parameters
    const email = searchParams.get('email') || searchParams.get('to');
    
    if (!email) {
      router.push('/');
      return;
    }

    // Standard mailto parameters that are acceptable
    const mailtoParams = ['subject', 'body', 'cc', 'bcc', 'reply-to'];
    const queryParts: string[] = [];
    
    // Build query string from mailto parameters
    for (const [key, value] of searchParams.entries()) {
      const lowerKey = key.toLowerCase();
      // Skip 'email' and 'to' as they're used for the mailto address
      if (mailtoParams.includes(lowerKey) && value) {
        // Values from useSearchParams are already decoded, so we encode them for the mailto URL
        queryParts.push(`${lowerKey}=${encodeURIComponent(value)}`);
      }
    }
    
    // Construct the mailto URL
    let mailtoUrl = `mailto:${email}`;
    if (queryParts.length > 0) {
      mailtoUrl += '?' + queryParts.join('&');
    }

    // Redirect to the mailto URL immediately
    window.location.href = mailtoUrl;
  }, [searchParams, router]);

  return null;
}

export default function GotoPage() {
  return (
    <Suspense fallback={null}>
      <RedirectComponent />
    </Suspense>
  );
}

