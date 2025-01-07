const bcrypt = require('bcryptjs');


const saltAndHashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const pwHash = bcrypt.hashSync(password, salt);
  return {
    salt,
    pwHash
  };
};

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedUsers() {
  const USERS = [
    {
      name: 'Ha Quoc Dat',
      email: 'dat.haquoc@ncc.asia',
      role: 'USER',
      password: 'Ncc@123'
    },
  ];
  const data = USERS.map((user) => {
    const { salt, pwHash } = saltAndHashPassword(user.password);
    return {
      ...user,
      salt,
      pwHash
    };
  });

  const users = await prisma.user.createMany({
    data
  });

  console.log(`Created ${users.count} users`);
}

const seedApplication = async () => {
  // await seedUsers();
};

seedApplication()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
