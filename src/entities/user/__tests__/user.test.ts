import { describe, expect, it } from 'vitest';

import { userToSafeData } from '../user';

describe('User', () => {
  describe('userToSafeData', () => {
    it('should return only safe data', () => {
      const user = {
        id: '123',
        name: 'test',
        email: 'test@email.com',
        passwordHash: 'passwordhash',
        bloat: 'bloat',
        password: 'testpassword',
      };

      const safeData = userToSafeData(user);

      expect(safeData).toEqual({
        id: '123',
        name: 'test',
        email: 'test@email.com',
      });
    });
  });
});
