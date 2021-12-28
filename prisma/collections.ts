import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  prisma.$transaction([
    prisma.collection.deleteMany(),
    prisma.collection.create({
      data: {
        name: 'TypeScript',
        slug: 'typescript',
        Language: { connect: { slug: 'typescript' } },
      },
    }),
    prisma.collection.create({
      data: {
        name: 'JavaScript',
        slug: 'javascript',
        Language: { connect: { slug: 'javascript' } },
      },
    }),
    prisma.collection.create({
      data: {
        name: 'PHP',
        slug: 'php',
        Language: { connect: { slug: 'php' } },
      },
    }),
    prisma.collection.create({
      data: {
        name: 'Python',
        slug: 'python',
        Language: { connect: { slug: 'python' } },
      },
    }),
    prisma.collection.create({
      data: {
        name: 'Rust',
        slug: 'rust',
        Language: { connect: { slug: 'rust' } },
      },
    }),
    prisma.collection.create({
      data: {
        name: 'Go',
        slug: 'go',
        Language: { connect: { slug: 'go' } },
      },
    }),
    prisma.collection.create({
      data: {
        name: 'Ruby',
        slug: 'ruby',
        Language: { connect: { slug: 'ruby' } },
      },
    }),
    prisma.collection.create({
      data: {
        name: 'Java',
        slug: 'java',
        Language: { connect: { slug: 'java' } },
      },
    }),
    prisma.collection.create({
      data: {
        name: 'C',
        slug: 'c',
        Language: { connect: { slug: 'c' } },
      },
    }),
    prisma.collection.create({
      data: {
        name: 'C++',
        slug: 'cplusplus',
        Language: { connect: { slug: 'cplusplus' } },
      },
    }),
    prisma.collection.create({
      data: {
        name: 'C#',
        slug: 'csharp',
        Language: { connect: { slug: 'csharp' } },
      },
    }),
    prisma.collection.create({
      data: {
        name: 'Laravel',
        slug: 'laravel',
        Topics: { connect: ['laravel'].map((topic) => ({ name: topic })) },
        terms: ['laravel', 'لاراول'],
        Language: { connect: { slug: 'php' } },
      },
    }),
    prisma.collection.create({
      data: {
        name: 'Node.js',
        slug: 'nodejs',
        Topics: {
          connect: ['nodejs', 'node-js', 'node'].map((topic) => ({
            name: topic,
          })),
        },
        terms: ['nodejs', 'node.js', 'node js', 'نود‌جی‌اس', 'نود.جی‌اس'],
      },
    }),
    prisma.collection.create({
      data: {
        name: 'Flutter',
        slug: 'flutter',
        Topics: {
          connect: ['flutter'].map((topic) => ({
            name: topic,
          })),
        },
        terms: ['flutter', 'فلاتر'],
      },
    }),
    prisma.collection.create({
      data: {
        name: 'React',
        slug: 'react',
        Topics: {
          connect: ['react', 'react-js', 'reactjs'].map((topic) => ({
            name: topic,
          })),
        },
        terms: [
          'react',
          'react.js',
          'reactjs',
          'ری‌اکت جی‌اس',
          'ری‌اکت.جی‌اس',
          'ری اکت',
        ],
      },
    }),
    prisma.collection.create({
      data: {
        name: 'Vue.js',
        slug: 'vuejs',
        Topics: {
          connect: ['vue', 'vuejs'].map((topic) => ({
            name: topic,
          })),
        },
        terms: ['vue', 'vue.js', 'vuejs', 'ویو جی‌اس', 'ویو.جی‌اس'],
      },
    }),
    prisma.collection.create({
      data: {
        name: 'Angular',
        slug: 'angular',
        Topics: {
          connect: ['angular', 'angularjs'].map((topic) => ({
            name: topic,
          })),
        },
        terms: ['angular', 'angular.js', 'angularjs', 'انگولار', 'انگیولار'],
      },
    }),
  ]);
};

main();
