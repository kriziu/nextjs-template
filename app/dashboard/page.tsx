import { validateCurrentSession } from '../_loaders/validate-current-session.loader';

export default async function DashboardPage() {
  const { user: me } = await validateCurrentSession();

  return <>hello {me.email}</>;
}
