import { CircleMinusIcon } from 'lucide-react';

import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '@/app/_components/ui/alert';

import GenerateVerificationCodeForm from './_components/generate-verification-code-form';
import ValidateVerificationCodeForm from './_components/validate-verification-code-form';

type PageProps = Readonly<{
  searchParams: Readonly<{
    invalidSession: string;
    token: string;
    email: string;
  }>;
}>;

export default function LoginPage({
  searchParams: { invalidSession, token, email },
}: PageProps) {
  const isInvalidSession = invalidSession !== undefined;

  if (token && email) {
    return <ValidateVerificationCodeForm verifyToken={token} email={email} />;
  }

  return (
    <>
      {isInvalidSession && (
        <Alert variant="destructive">
          <CircleMinusIcon className="size-4" />
          <AlertTitle>Unauthenticated!</AlertTitle>
          <AlertDescription>
            Your session is invalid. Please login again.
          </AlertDescription>
        </Alert>
      )}
      <GenerateVerificationCodeForm />
    </>
  );
}
