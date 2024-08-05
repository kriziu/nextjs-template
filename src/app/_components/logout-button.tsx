'use client';

import { useServerAction } from 'zsa-react';

import { Button } from '@/components/ui/button';

import * as Actions from '../actions';

export default function LogoutButton() {
  const logoutAction = useServerAction(Actions.logoutAction);

  return (
    <Button onClick={() => logoutAction.execute()} loading={logoutAction.isPending}>
      Logout
    </Button>
  );
}
