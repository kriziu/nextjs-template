import { PropsWithChildren } from 'react';

import { validateCurrentSession } from '../_loaders/validate-current-session.loader';

export default async function DashboardTemplate({
  children,
}: Readonly<PropsWithChildren>) {
  await validateCurrentSession();

  return <>{children}</>;
}
