import { PropsWithChildren } from 'react';

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <main className="grid place-items-center h-dvh">
      <div className="max-w-sm space-y-4 w-full">{children}</div>
    </main>
  );
}
