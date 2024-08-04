import CreateUserButton from './_components/create-user-button';
import { getUsersLoader } from './loaders';

export default async function Home() {
  const users = await getUsersLoader();

  return (
    <main className="flex items-center justify-center h-screen flex-col">
      {users.map((user) => (
        <div key={user.id} className="p-4">
          {user.name}
        </div>
      ))}
      <CreateUserButton />
    </main>
  );
}
