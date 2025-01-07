const bcrypt = require('bcryptjs');
const prisma = require('../../prisma');

export default class UserRepository {
  static async getUserByCredentials(email: string, plainPassword: string) {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        email
      }
    });
    const { password } = user;
    await bcrypt.compare(plainPassword, password);
  }
}
