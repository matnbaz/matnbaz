import { PrismaClient } from '@prisma/client';
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const main = async () => {
  const admin1 = await prisma.user.create({
    data: {
      email: 'johndoe@acme.test',
      password: bcrypt.hashSync('password', 10),
      name: 'John Doe',
      type: 'Admin',
    },
  });
  console.log('Admin1 created.');

  const mod1 = await prisma.user.create({
    data: {
      email: 'janedoe@acme.test',
      password: bcrypt.hashSync('password', 10),
      name: 'Jane Doe',
      type: 'Moderator',
    },
  });
  console.log('Moderator1 created.');
};

main();
