import Link from 'next/link';

import { Button } from '@/app/_components/ui/button';

export default async function HomePage() {
  return (
    <main className="flex h-dvh flex-col items-center justify-center gap-1 p-8">
      <Button asChild className="fixed right-4 top-4">
        <Link href="/login">Login</Link>
      </Button>

      <h1 className="max-w-2xl text-center text-2xl">
        This is just a template.
      </h1>
      <h2 className="text-xl text-muted-foreground">
        You can start editing the page by modifying <code>app/page.tsx</code>.
      </h2>
    </main>
  );
}
