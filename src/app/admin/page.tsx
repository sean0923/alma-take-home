'use client';

import { AdminNav } from '@/components/Admin/AdminNav';
import { Leads } from '@/components/Admin/Leads';
import { useAuthContext } from '@/provider/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  const { currClientAuth } = useAuthContext();
  const { hasAuthAttempt, user } = currClientAuth;

  const router = useRouter();

  // push to login if not logged in
  useEffect(() => {
    if (!hasAuthAttempt) return;
    if (!user) return router.push('/login');
  }, [hasAuthAttempt, !user]);

  if (!hasAuthAttempt) return null;

  return (
    <div
      className="flex"
      style={{
        background: `linear-gradient(to bottom right, #F8FDCA 10%, rgba(255, 255, 255, 0) 15%)`,
      }}
    >
      {/* nav */}
      <AdminNav />

      <div className="flex-1">
        <Leads />
      </div>
    </div>
  );
}
