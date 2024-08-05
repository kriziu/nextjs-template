import { protectPage } from '@/lib/auth';

import LogoutButton from './_components/logout-button';

export default async function HomePage() {
  await protectPage();

  return (
    <main className="grid place-items-center h-dvh">
      <div className="space-y-4 flex flex-col">
        <p>This page is protected</p>
        <LogoutButton />
      </div>
    </main>
  );
}
