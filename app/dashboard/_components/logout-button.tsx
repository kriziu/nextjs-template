'use client';

import { LogOutIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';

import { Button } from '@/app/_components/ui/button';

import * as Actions from '../actions';

export default function LogoutButton() {
  const logoutAction = useServerAction(Actions.logoutAction, {
    onError: ({ err }) => {
      toast.error(err.message);
    },
  });

  return (
    <Button
      onClick={() => logoutAction.execute()}
      loading={logoutAction.isPending}
      size="icon"
      variant="secondary"
    >
      <LogOutIcon className="size-4" />
    </Button>
  );
}
