import { PropsWithChildren } from 'react';

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <main className="grid h-dvh place-items-center">
      <div className="w-full max-w-md space-y-4">{children}</div>
    </main>
  );
}
