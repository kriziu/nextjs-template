import { CircleCheckBig, CircleMinus } from 'lucide-react';
import Link from 'next/link';

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

import LoginUserForm from './_components/login-user-form';

type PageProps = Readonly<{
  searchParams: Readonly<{
    unauthenticated: string;
    registered: string;
  }>;
}>;

export default function LoginPage({
  searchParams: { unauthenticated, registered },
}: PageProps) {
  const isUnauthenticated = unauthenticated !== undefined;
  const isRegistered = registered !== undefined;

  return (
    <>
      {isRegistered && (
        <Alert variant="success">
          <CircleCheckBig className="size-4" />
          <AlertTitle>Succesfully registered!</AlertTitle>
          <AlertDescription>
            You can now login to your account with the credentials you provided.
          </AlertDescription>
        </Alert>
      )}
      {isUnauthenticated && (
        <Alert variant="destructive">
          <CircleMinus className="size-4" />
          <AlertTitle>Unauthenticated!</AlertTitle>
          <AlertDescription>
            Your session has expired. Please login again.
          </AlertDescription>
        </Alert>
      )}
      <LoginUserForm />

      <Link href={`/register${isUnauthenticated ? '?unauthenticated' : ''}`} passHref>
        <Button variant="link">Don&apos;t have an account? Register here</Button>
      </Link>
    </>
  );
}
