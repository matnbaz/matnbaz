import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const data = [
  {
    name: 'TypeScript',
    slug: 'typescript',
    color: '#3178C6',
    description:
      'تایپ‌اسکریپت یک زبان برنامه‌نویسی است که توسط مایکروسافت توسعه یافته و نگهداری می‌شود و یک تایپینگ اختیاری استاتیک به جاوا‌اسکریپت اضافه می‌کند.',
    image: 'https://simpleicons.org/icons/typescript.svg',
    Languages: { connect: { slug: 'typescript' } },
  },
  {
    name: 'JavaScript',
    slug: 'javascript',
    color: '#F7DF1E',
    description:
      'جاوا‌اسکریپت یک زبان برنامه‌نویسی است که در کنار HTML و CSS یکی از فناوری‌های اصلی شبکه جهانی وب است و برای بیش‌تر تعاملی کردن سایت‌ها کاربرد دارد.',
    image: 'https://simpleicons.org/icons/javascript.svg',
    Languages: { connect: { slug: 'javascript' } },
  },
  {
    name: 'PHP',
    slug: 'php',
    color: '#777BB4',
    description:
      'پی‌اچ‌پی یک زبان برنامه‌نویسی همه منظوره است که برای توسعه وب طراحی شده است و می‌تواند با HTML ادغام شود.',
    image: 'https://simpleicons.org/icons/php.svg',
    Languages: { connect: { slug: 'php' } },
  },
  {
    name: 'PHP Minus Laravel',
    slug: 'php-minus-laravel',
    color: '#777BB4',
    description:
      'این کالکشن برای افرادی‌ست که از پی‌اچ‌پی استفاده می‌کنند اما از فریم‌ورک لاراول استفاده نمی‌کنند.',
    image: 'https://simpleicons.org/icons/php.svg',
    Languages: { connect: { slug: 'php' } },
    TopicsExcluded: { connect: ['laravel'].map((topic) => ({ name: topic })) },
    termsExcluded: ['laravel', 'لاراول', 'لاراولی'],
    readmeTermsExcluded: ['laravel', 'لاراول', 'لاراولی'],
  },
  {
    name: 'Python',
    slug: 'python',
    color: '#3776AB',
    description:
      'پایتون یک زبان برنامه‌نویسی همه‌منظوره سطح بالا مفسری است و فلسفه طراحی آن بر خوانایی کد تاکید می‌کند.',
    image: 'https://simpleicons.org/icons/python.svg',
    Languages: { connect: { slug: 'python' } },
  },
  {
    name: 'Swift',
    slug: 'swift',
    color: '#F05138',
    description:
      'سوئیفت یک زبان برنامه‌نویسی کامپایل‌شده چند‌منظوره و چند‌پارادایم است که توسط شرکت اپل و جامعه اپن‌سورس توسعه یافته اشت.',
    image: 'https://simpleicons.org/icons/swift.svg',
    Languages: { connect: { slug: 'swift' } },
  },
  {
    name: 'Lua',
    slug: 'lua',
    color: '#2C2D72',
    description:
      'لوآ یک زبان برنامه‌نویسی سبک‌وزن، سطح‌بالا و چند‌پارادایم است که عمدتا برای استفاده به‌صورت جاسازه شده (امبد) در برنامه‌ها است.',
    image: 'https://simpleicons.org/icons/lua.svg',
    Languages: { connect: { slug: 'lua' } },
  },
  {
    name: 'Dart',
    slug: 'dart',
    color: '#0175C2',
    description:
      'دارت یک زبان برنامه‌نویسی توسعه داده شده توسط گوگل است که برای توسعه سمت کلاینت کاربرد دارد، مانند وب و موبایل.',
    image: 'https://simpleicons.org/icons/dart.svg',
    Languages: { connect: { slug: 'dart' } },
  },
  {
    name: 'Rust',
    slug: 'rust',
    color: '#000000',
    description:
      'راست یک زبان برنامه‌نویسی چند‌پارادایم و همه‌منظوره اسست که برای کارایی و ایمنی ساخته شده است و از لحاظ نحوی شبیه به C++ است.',
    image: 'https://simpleicons.org/icons/rust.svg',
    Languages: { connect: { slug: 'rust' } },
  },
  {
    name: 'Kotlin',
    slug: 'kotlin',
    color: '#7F52FF',
    description:
      'کاتلین یک زبان برنامه‌نویسی چند‌پلتفرمی، تایپ ایستا و همه‌منظوره است که برای تعامل کامل با جاوا طراحی شده است.',
    image: 'https://simpleicons.org/icons/kotlin.svg',
    Languages: { connect: { slug: 'kotlin' } },
  },
  {
    name: 'Elixir',
    slug: 'elixir',
    color: '#4B275F',
    description:
      'الیکسیر یک زبان برنامه‌نویسی فانکشنال، همزمان و همه‌منظوره است که بالای اِرلنگ ساخته می‌شود و ابسترکشن‌های مشابهی را برای ساخت برنامه‌ها به اشتراک می‌گذارد.',
    image: 'https://simpleicons.org/icons/elixir.svg',
    Languages: { connect: { slug: 'elixir' } },
  },
  {
    name: 'Go',
    slug: 'go',
    color: '#00ADD8',
    description:
      'گو یک زبان برنامه‌نویسی تایپ‌شده و کامپایل‌شده است که توسط گوگل طراحی شده است. از لحاظ ساختاری شبیه C است اما با ایمنی حافظه، جمع‌آوری زباله و تایپ ساختاری و...',
    image: 'https://simpleicons.org/icons/go.svg',
    Languages: { connect: { slug: 'go' } },
  },
  {
    name: 'Ruby',
    slug: 'ruby',
    color: '#CC342D',
    description:
      'روبی یک زبان برنامه‌نویسی تعبیر‌شده، سطح‌بالا و همه‌منظوره است که از چندین پارادایم برنامه‌نویسی پشتیبانی می‌کند و بر بهره‌وری و سادگی برنامه‌نویسی تاکید دارد.',
    image: 'https://simpleicons.org/icons/ruby.svg',
    Languages: { connect: { slug: 'ruby' } },
  },
  {
    name: 'Java',
    slug: 'java',
    color: '#007396',
    description:
      'جاوا یک زبان برنامه‌نویسی سطح‌بالا، مبتنی بر کلاس و شی‌گرا است که به گونه‌ای طراحی شده است که تا حد امکان وابستگی‌های پیاده سازی کم‌تری داشته باشد.',
    image: 'https://simpleicons.org/icons/java.svg',
    Languages: { connect: { slug: 'java' } },
  },
  {
    name: 'C',
    slug: 'c',
    color: '#A8B9CC',
    description:
      'سی یک زبان برنامه‌نویسی کامپیوتری همه‌منظوره و رویه‌ای است که از برنامه‌نویسی ساخت یافته، دامنه متغیر واژگانی و بازگشت، با سیستم نوع ایستا پشتیبانی می‌کند.',
    image: 'https://simpleicons.org/icons/c.svg',
    Languages: { connect: { slug: 'c' } },
  },
  {
    name: 'C++',
    slug: 'cplusplus',
    color: '#00599C',
    description:
      'سی++ یک زبان برنامه‌نویسی همه‌منظوره است که به‌عنوان گسترش‌دهنده زبان سی، یا "سی به‌همراه کلاس‌ها" ساخته شده است.',
    image: 'https://simpleicons.org/icons/cplusplus.svg',
    Languages: { connect: { slug: 'cplusplus' } },
  },
  {
    name: 'C#',
    slug: 'csharp',
    color: '#239120',
    description:
      'سی‌شارپ یک زبان برنامه‌نویسی همه‌منظوره و چند‌پارادایم است که در زمینه‌های مختلفی کاربرد دارد.',
    image: 'https://simpleicons.org/icons/csharp.svg',
    Languages: { connect: { slug: 'csharp' } },
  },
  {
    name: 'Laravel',
    slug: 'laravel',
    color: '#FF2D20',
    description:
      'لاراول یک فریم‌ورک آزاد و متن‌باز برای پی‌اچ‌پی است که برای توسعه برنامه‌های کاربردی وب با الگور معماری MVC ساخته شده است.',
    image: 'https://simpleicons.org/icons/laravel.svg',
    Topics: { connect: ['laravel'].map((topic) => ({ name: topic })) },
    terms: ['laravel', 'لاراول', 'لاراولی'],
    readmeTerms: ['laravel', 'لاراولی', 'لاراول'],
    Languages: { connect: { slug: 'php' } },
  },
  {
    name: '.NET',
    slug: 'dotnet',
    color: '#512BD4',
    description:
      'دات‌نت یک فریم‌ورک نرم‌افزاری است که توسط مایکروسافت توسعه یافته و عمدتاً روی ویندوز مایکروسافت اجرا می‌شود.',
    image: 'https://simpleicons.org/icons/dotnet.svg',
    Topics: { connect: ['dotnet'].map((topic) => ({ name: topic })) },
    terms: ['dotnet', 'دات نت'],
  },
  {
    name: 'Django',
    slug: 'django',
    color: '#092E20',
    description:
      'جنگو یک فریم‌ورک وب آزاد و متن‌باز مبتنی بر پایتون است که از الگوی معماری MVT پیروی می‌کند.',
    image: 'https://simpleicons.org/icons/django.svg',
    Topics: { connect: ['django'].map((topic) => ({ name: topic })) },
    terms: ['django', 'جنگو'],
    Languages: { connect: { slug: 'python' } },
  },
  {
    name: 'Node.js',
    slug: 'nodejs',
    color: '#339933',
    description:
      'نود‌جی‌اس یک محیط امن اجرای جاوا‌اسکریپت به‌صورت متن‌باز و چند‌پلتفرمی برای توسعه سمت سرور است که بر روی موتور V8 اجرا می‌شود و جاوا‌اسکریپت را خارج از مرورگر وب اجرا می‌کند.',
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
    description:
      'فلاتر یک کیت توسعه نرم‌افزار رابط کاربری منبع‌باز است که توسط گوگل ایجاد شده و برای توسعه برنامه‌های کاربردی برای پلتفرم‌های مختلف با استفاده از یک پایگاه کد واحد استفاده می‌شود.',
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
    description:
      'ری‌اکت یک کتابخانه فرانت‌اند جاوا‌اسکریپتی آزاد و متن‌باز، ساخته شده توسط متا‌ (فیس‌بوک) است که می‌تواند برای ساخت رابط‌های کاربری برنامه‌های تک‌صفحه‌ای استفاده شود.',
    image: 'https://simpleicons.org/icons/react.svg',
    Topics: {
      connect: ['react', 'react-js', 'reactjs'].map((topic) => ({
        name: topic,
      })),
    },
    TopicsExcluded: {
      connect: ['react-native', 'native'].map((topic) => ({
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
    termsExcluded: ['react-native', 'react native', 'native'],
    readmeTermsExcluded: ['react-native', 'react native', 'native'],
  },
  {
    name: 'React Native',
    slug: 'react-native',
    color: '#61DAFB',
    description:
      'ری‌اکت نیتیو یک فریمورک طراحی رابط کاربری ساخته شده توسط متا (فیس‌بوک) است که برای توسعه برنامه‌های کاربردی اندروید، iOS، ویندوز و... کاربرد دارد.',
    image: 'https://simpleicons.org/icons/react.svg',
    Topics: {
      connect: ['react-native', 'reactnative'].map((topic) => ({
        name: topic,
      })),
    },
    terms: ['react-native', 'react native', 'ری‌اکت نیتیو'],
  },
  {
    name: 'Vue.js',
    slug: 'vuejs',
    color: '#4FC08D',
    description:
      'ویو‌جی‌اس یک فریم‌ورک جاوا‌اسکریپتی متن‌باز فرانت‌اند است که برای ساخت رابط‌های کاربری و برنامه‌های تک‌صفحه‌ای استفاده می‌شود.',
    image: 'https://simpleicons.org/icons/vuedotjs.svg',
    Topics: {
      connect: ['vue', 'vuejs'].map((topic) => ({
        name: topic,
      })),
    },
    terms: ['vue', 'vue.js', 'vuejs', 'ویو جی‌اس', 'ویو.جی‌اس'],
  },
  {
    name: 'Awesome Lists',
    slug: 'awesome-lists',
    color: '#FC60A8',
    description:
      'Awesome Lists حرکتی‌ست که Sindre Sorhus در پلتفرم گیت‌هاب شروع کرد که در آن از موضوعات مختلف لیست‌هایی از لینک‌های مفید جمع‌آوری می‌شود.',
    image: 'https://simpleicons.org/icons/awesomelists.svg',
    Topics: {
      connect: ['awesome-list'].map((topic) => ({
        name: topic,
      })),
    },
    terms: ['awesome-'],
  },
  {
    name: 'Svelte',
    slug: 'svelte',
    color: '#FF3E00',
    description:
      'سولت یک کامپایلر فرانت‌اند آزاد و متن‌باز است و بیلد نهایی آن شامل کد فریم‌ورک نمی‌شود.',
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
    description:
      'انگولار یک فریم‌ورک متن‌باز برنامه وب تایپ‌اسکریپتی است که توسط تیم انگولار در گوگل و جامعه‌ای از افراد و شرکت‌های دیگر هدایت می‌شود و یک بازنویسی از انگولار‌جی‌اس است.',
    Topics: {
      connect: ['angular', 'angularjs'].map((topic) => ({
        name: topic,
      })),
    },
    terms: ['angular', 'angular.js', 'angularjs', 'انگولار', 'انگیولار'],
  },
  {
    name: 'NestJS',
    slug: 'nest-js',
    color: '#E0234E',
    image: 'https://simpleicons.org/icons/nestjs.svg',
    description:
      'نست‌جی‌اس یک فریمورک پیشرو و محبوب نود‌جی‌اس برای ساخت برنامه‌های کاربردی کارآمد و مقیا‌س‌پذیر در سمت سرور است.',
    Topics: {
      connect: ['nestjs', 'nest'].map((topic) => ({
        name: topic,
      })),
    },
    Languages: { connect: { slug: 'typescript' } },
    terms: ['nestjs', 'nest.js', 'nest'],
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
