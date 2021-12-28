import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const data = [
  {
    name: 'TypeScript',
    slug: 'typescript',
    color: '#3178C6',
    image: 'https://simpleicons.org/icons/typescript.svg',
    Language: { connect: { slug: 'typescript' } },
  },
  {
    name: 'JavaScript',
    slug: 'javascript',
    color: '#F7DF1E',
    image: 'https://simpleicons.org/icons/javascript.svg',
    Language: { connect: { slug: 'javascript' } },
  },
  {
    name: 'PHP',
    slug: 'php',
    color: '#777BB4',
    image: 'https://simpleicons.org/icons/php.svg',
    Language: { connect: { slug: 'php' } },
  },
  {
    name: 'Python',
    slug: 'python',
    color: '#3776AB',
    image: 'https://simpleicons.org/icons/python.svg',
    Language: { connect: { slug: 'python' } },
  },
  {
    name: 'Swift',
    slug: 'swift',
    color: '#F05138',
    image: 'https://simpleicons.org/icons/swift.svg',
    Language: { connect: { slug: 'swift' } },
  },
  {
    name: 'Lua',
    slug: 'lua',
    color: '#2C2D72',
    image: 'https://simpleicons.org/icons/lua.svg',
    Language: { connect: { slug: 'lua' } },
  },
  {
    name: 'Dart',
    slug: 'dart',
    color: '#0175C2',
    image: 'https://simpleicons.org/icons/dart.svg',
    Language: { connect: { slug: 'dart' } },
  },
  {
    name: 'Rust',
    slug: 'rust',
    color: '#000000',
    image: 'https://simpleicons.org/icons/rust.svg',
    Language: { connect: { slug: 'rust' } },
  },
  {
    name: 'Kotlin',
    slug: 'kotlin',
    color: '#7F52FF',
    image: 'https://simpleicons.org/icons/kotlin.svg',
    Language: { connect: { slug: 'kotlin' } },
  },
  {
    name: 'Elixir',
    slug: 'elixir',
    color: '#4B275F',
    image: 'https://simpleicons.org/icons/elixir.svg',
    Language: { connect: { slug: 'elixir' } },
  },
  {
    name: 'Go',
    slug: 'go',
    color: '#00ADD8',
    image: 'https://simpleicons.org/icons/go.svg',
    Language: { connect: { slug: 'go' } },
  },
  {
    name: 'Ruby',
    slug: 'ruby',
    color: '#CC342D',
    image: 'https://simpleicons.org/icons/ruby.svg',
    Language: { connect: { slug: 'ruby' } },
  },
  {
    name: 'Java',
    slug: 'java',
    color: '#007396',
    image: 'https://simpleicons.org/icons/java.svg',
    Language: { connect: { slug: 'java' } },
  },
  {
    name: 'C',
    slug: 'c',
    color: '#A8B9CC',
    image: 'https://simpleicons.org/icons/c.svg',
    Language: { connect: { slug: 'c' } },
  },
  {
    name: 'C++',
    slug: 'cplusplus',
    color: '#00599C',
    image: 'https://simpleicons.org/icons/cplusplus.svg',
    Language: { connect: { slug: 'cplusplus' } },
  },
  {
    name: 'C#',
    slug: 'csharp',
    color: '#239120',
    image: 'https://simpleicons.org/icons/csharp.svg',
    Language: { connect: { slug: 'csharp' } },
  },
  {
    name: 'Laravel',
    slug: 'laravel',
    color: '#FF2D20',
    image: 'https://simpleicons.org/icons/laravel.svg',
    Topics: { connect: ['laravel'].map((topic) => ({ name: topic })) },
    terms: ['laravel', 'لاراول'],
    Language: { connect: { slug: 'php' } },
  },
  {
    name: '.NET',
    slug: 'dotnet',
    color: '#512BD4',
    image: 'https://simpleicons.org/icons/dotnet.svg',
    Topics: { connect: ['dotnet'].map((topic) => ({ name: topic })) },
    terms: ['dotnet', 'دات نت'],
  },
  {
    name: 'Django',
    slug: 'django',
    color: '#092E20',
    image: 'https://simpleicons.org/icons/django.svg',
    Topics: { connect: ['django'].map((topic) => ({ name: topic })) },
    terms: ['django', 'جنگو'],
    Language: { connect: { slug: 'python' } },
  },
  {
    name: 'Node.js',
    slug: 'nodejs',
    color: '#339933',
    image: 'https://simpleicons.org/icons/nodedotjs.svg',
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
    image: 'https://simpleicons.org/icons/flutter.svg',
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
    image: 'https://simpleicons.org/icons/react.svg',
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
    image: 'https://simpleicons.org/icons/vuedotjs.svg',
    Topics: {
      connect: ['vue', 'vuejs'].map((topic) => ({
        name: topic,
      })),
    },
    terms: ['vue', 'vue.js', 'vuejs', 'ویو جی‌اس', 'ویو.جی‌اس'],
  },
  {
    name: 'Svelte',
    slug: 'svelte',
    color: '#FF3E00',
    image: 'https://simpleicons.org/icons/svelte.svg',
    Topics: {
      connect: ['svelte'].map((topic) => ({
        name: topic,
      })),
    },
    terms: ['svelte'],
  },
  {
    name: 'Angular',
    slug: 'angular',
    color: '#DD0031',
    image: 'https://simpleicons.org/icons/angular.svg',
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
