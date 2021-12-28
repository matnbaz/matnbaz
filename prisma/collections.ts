import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const data = [
  {
    name: 'TypeScript',
    slug: 'typescript',
    Language: { connect: { slug: 'typescript' } },
  },
  {
    name: 'JavaScript',
    slug: 'javascript',
    Language: { connect: { slug: 'javascript' } },
  },
  {
    name: 'PHP',
    slug: 'php',
    Language: { connect: { slug: 'php' } },
  },
  {
    name: 'Python',
    slug: 'python',
    Language: { connect: { slug: 'python' } },
  },
  {
    name: 'Rust',
    slug: 'rust',
    Language: { connect: { slug: 'rust' } },
  },
  {
    name: 'Go',
    slug: 'go',
    Language: { connect: { slug: 'go' } },
  },
  {
    name: 'Ruby',
    slug: 'ruby',
    Language: { connect: { slug: 'ruby' } },
  },
  {
    name: 'Java',
    slug: 'java',
    Language: { connect: { slug: 'java' } },
  },
  {
    name: 'C',
    slug: 'c',
    Language: { connect: { slug: 'c' } },
  },
  {
    name: 'C++',
    slug: 'cplusplus',
    Language: { connect: { slug: 'cplusplus' } },
  },
  {
    name: 'C#',
    slug: 'csharp',
    Language: { connect: { slug: 'csharp' } },
  },
  {
    name: 'Laravel',
    slug: 'laravel',
    Topics: { connect: ['laravel'].map((topic) => ({ name: topic })) },
    terms: ['laravel', 'لاراول'],
    Language: { connect: { slug: 'php' } },
  },
  {
    name: 'Node.js',
    slug: 'nodejs',
    Topics: {
      connect: ['nodejs', 'node-js', 'node'].map((topic) => ({
        name: topic,
      })),
    },
    terms: ['nodejs', 'node.js', 'node js', 'نود‌جی‌اس', 'نود.جی‌اس'],
  },
  {
    name: 'Flutter',
    slug: 'flutter',
    Topics: {
      connect: ['flutter'].map((topic) => ({
        name: topic,
      })),
    },
    terms: ['flutter', 'فلاتر'],
  },
  {
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
  {
    name: 'Vue.js',
    slug: 'vuejs',
    Topics: {
      connect: ['vue', 'vuejs'].map((topic) => ({
        name: topic,
      })),
    },
    terms: ['vue', 'vue.js', 'vuejs', 'ویو جی‌اس', 'ویو.جی‌اس'],
  },
  {
    name: 'Angular',
    slug: 'angular',
    Topics: {
      connect: ['angular', 'angularjs'].map((topic) => ({
        name: topic,
      })),
    },
    terms: ['angular', 'angular.js', 'angularjs', 'انگولار', 'انگیولار'],
  },
];

const main = async () => {
  prisma.$transaction(
    data.map((item) =>
      prisma.collection.upsert({
        where: { slug: item.slug },
        create: item,
        update: item,
      })
    )
  );
};

main();
