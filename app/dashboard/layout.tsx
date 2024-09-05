import { PropsWithChildren } from 'react';

import LogoutButton from './_components/logout-button';

export default function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <main className="relative flex h-dvh w-full flex-col items-center justify-center">
      <div className="fixed right-4 top-4">
        <LogoutButton />
      </div>
      {children}
    </main>
  );
}
