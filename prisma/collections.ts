import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const data = [
  {
    name: 'TypeScript',
    slug: 'typescript',
    color: '#3178C6',
    Language: { connect: { slug: 'typescript' } },
  },
  {
    name: 'JavaScript',
    slug: 'javascript',
    color: '#F7DF1E',
    Language: { connect: { slug: 'javascript' } },
  },
  {
    name: 'PHP',
    slug: 'php',
    color: '#777BB4',
    Language: { connect: { slug: 'php' } },
  },
  {
    name: 'Python',
    slug: 'python',
    color: '#3776AB',
    Language: { connect: { slug: 'python' } },
  },
  {
    name: 'Rust',
    slug: 'rust',
    color: '#000000',
    Language: { connect: { slug: 'rust' } },
  },
  {
    name: 'Go',
    slug: 'go',
    color: '#00ADD8',
    Language: { connect: { slug: 'go' } },
  },
  {
    name: 'Ruby',
    slug: 'ruby',
    color: '#CC342D',
    Language: { connect: { slug: 'ruby' } },
  },
  {
    name: 'Java',
    slug: 'java',
    color: '#007396',
    Language: { connect: { slug: 'java' } },
  },
  {
    name: 'C',
    slug: 'c',
    color: '#A8B9CC',
    Language: { connect: { slug: 'c' } },
  },
  {
    name: 'C++',
    slug: 'cplusplus',
    color: '#00599C',
    Language: { connect: { slug: 'cplusplus' } },
  },
  {
    name: 'C#',
    slug: 'csharp',
    color: '#239120',
    Language: { connect: { slug: 'csharp' } },
  },
  {
    name: 'Laravel',
    slug: 'laravel',
    color: '#FF2D20',
    Topics: { connect: ['laravel'].map((topic) => ({ name: topic })) },
    terms: ['laravel', 'لاراول'],
    Language: { connect: { slug: 'php' } },
  },
  {
    name: 'Node.js',
    slug: 'nodejs',
    color: '#339933',
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
    color: '#02569B',
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
    color: '#61DAFB',
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
    color: '#4FC08D',
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
    color: '#DD0031',
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
