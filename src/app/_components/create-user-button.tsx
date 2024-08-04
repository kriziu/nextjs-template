'use client';

import { useServerAction } from 'zsa-react';

import { Button } from '@/components/ui/button';

import * as Actions from '../actions';

export default function CreateUserButton() {
  const createRandomUserAction = useServerAction(Actions.createRandomUserAction);

  return (
    <Button
      onClick={() => createRandomUserAction.execute()}
      loading={createRandomUserAction.isPending}
    >
      Create User
    </Button>
  );
}
