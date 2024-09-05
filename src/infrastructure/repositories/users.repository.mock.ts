import { IUsersRepository } from '@/src/application/repositories/users.repository.interface';
import { User } from '@/src/entities/models/user';

export class MockUsersRepository implements IUsersRepository {
  private _users: User[];

  constructor() {
    this._users = [
      {
        id: '1',
        email: 'one@example.com',
        emailVerified: false,
      },
      {
        id: '2',
        email: 'two@example.com',
        emailVerified: false,
      },
      {
        id: '3',
        email: 'three@example.com',
        emailVerified: true,
      },
    ];
  }

  async getUser(id: string): Promise<User | undefined> {
    const user = this._users.find(u => u.id === id);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = this._users.find(u => u.email === email);
    return user;
  }

  async createUser(input: User): Promise<User> {
    this._users.push(input);
    return input;
  }

  async editUser(id: string, input: Partial<User>): Promise<User> {
    const user = this._users.find(u => u.id === id);
    if (!user) {
      throw new Error('Cannot edit user.');
    }
    return { ...user, ...input };
  }
}
