import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const data: Parameters<PrismaClient['collection']['upsert']>[0]['create'][] = [
  {
    name: 'TypeScript',
    slug: 'typescript',
    color: '#3178C6',
    Description: {
      create: {
        fa: 'تایپ‌اسکریپت یک زبان برنامه‌نویسی است که توسط مایکروسافت توسعه یافته و نگهداری می‌شود و یک تایپینگ اختیاری استاتیک به جاوا‌اسکریپت اضافه می‌کند.',
        en: 'TypeScript is a programming language developed and maintained by Microsoft and adds an optional static typing to JavaScript.',
      },
    },
    image: 'https://simpleicons.org/icons/typescript.svg',
    Languages: { connect: { slug: 'typescript' } },
  },
  {
    name: 'JavaScript',
    slug: 'javascript',
    color: '#F7DF1E',
    Description: {
      create: {
        fa: 'جاوا‌اسکریپت یک زبان برنامه‌نویسی است که در کنار HTML و CSS یکی از فناوری‌های اصلی شبکه جهانی وب است و برای بیش‌تر تعاملی کردن سایت‌ها کاربرد دارد.',
        en: 'JavaScript or JS is one of the core technologies of the World Wide Web, alongside HTML and CSS and adds is most commonly used to add interactivity to web pages.',
      },
    },
    image: 'https://simpleicons.org/icons/javascript.svg',
    Languages: { connect: { slug: 'javascript' } },
  },
  {
    name: 'PHP',
    slug: 'php',
    color: '#777BB4',
    Description: {
      create: {
        fa: 'پی‌اچ‌پی یک زبان برنامه‌نویسی همه منظوره است که برای توسعه وب طراحی شده است و می‌تواند با HTML ادغام شود.',
        en: 'PHP is a general-purpose scripting language geared towards web development, mostly used alongside HTML.',
      },
    },
    image: 'https://simpleicons.org/icons/php.svg',
    Languages: { connect: { slug: 'php' } },
  },
  {
    name: 'PHP Minus Laravel',
    slug: 'php-minus-laravel',
    color: '#777BB4',
    Description: {
      create: {
        fa: 'این مجموعه برای افرادی‌ست که از پی‌اچ‌پی استفاده می‌کنند اما از فریم‌ورک لاراول استفاده نمی‌کنند.',
        en: 'This collection is for PHP users that do not use Laravel.',
      },
    },
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
    Description: {
      create: {
        fa: 'پایتون یک زبان برنامه‌نویسی همه‌منظوره سطح بالا مفسری است. فلسفه طراحی آن بر خوانایی کد تاکید می‌کند.',
        en: 'Python is an interpreted high-level general-purpose language. Its design philosophy emphasizes code readability.',
      },
    },
    image: 'https://simpleicons.org/icons/python.svg',
    Languages: { connect: { slug: 'python' } },
  },
  {
    name: 'Swift',
    slug: 'swift',
    color: '#F05138',
    Description: {
      create: {
        fa: 'سوئیفت یک زبان برنامه‌نویسی کامپایل‌شده چند‌منظوره و چند‌پارادایم است که توسط شرکت اپل و جامعه اپن‌سورس توسعه یافته است.',
        en: 'Swift is a general-purpose, multi-paradigm, compiled programming language developed by Apple Inc. and the open-source community.',
      },
    },
    image: 'https://simpleicons.org/icons/swift.svg',
    Languages: { connect: { slug: 'swift' } },
  },
  {
    name: 'Lua',
    slug: 'lua',
    color: '#2C2D72',
    Description: {
      create: {
        fa: 'لوآ یک زبان برنامه‌نویسی سبک‌وزن، سطح‌بالا و چند‌پارادایم است که عمدتا برای استفاده به‌صورت جاسازه شده (امبد) در برنامه‌ها است.',
        en: 'Lua is a lightweight, high-level, multi-paradigm programming language designed primarily for embedded use in applications.',
      },
    },
    image: 'https://simpleicons.org/icons/lua.svg',
    Languages: { connect: { slug: 'lua' } },
  },
  {
    name: 'Dart',
    slug: 'dart',
    color: '#0175C2',
    Description: {
      create: {
        fa: 'دارت یک زبان برنامه‌نویسی توسعه داده شده توسط گوگل است که برای توسعه سمت کلاینت کاربرد دارد، مانند وب و موبایل.',
        en: 'Dart is a programming language designed for client development, such as for the web and mobile apps.',
      },
    },
    image: 'https://simpleicons.org/icons/dart.svg',
    Languages: { connect: { slug: 'dart' } },
  },
  {
    name: 'Rust',
    slug: 'rust',
    color: '#000000',
    Description: {
      create: {
        fa: 'راست یک زبان برنامه‌نویسی چند‌پارادایم و همه‌منظوره اسست که برای کارایی و ایمنی ساخته شده است و از لحاظ نحوی شبیه به C++ است.',
        en: 'Rust is a multi-paradigm, general-purpose programming language designed for performance and safety and is syntactically similar to C++',
      },
    },
    image: 'https://simpleicons.org/icons/rust.svg',
    Languages: { connect: { slug: 'rust' } },
  },
  {
    name: 'Kotlin',
    slug: 'kotlin',
    color: '#7F52FF',
    Description: {
      create: {
        fa: 'کاتلین یک زبان برنامه‌نویسی چند‌پلتفرمی، تایپ ایستا و همه‌منظوره است که برای تعامل کامل با جاوا طراحی شده است.',
        en: 'Kotlin is a cross-platform, statically typed, general-purpose programming language, designed to interpolate fully with Java.',
      },
    },
    image: 'https://simpleicons.org/icons/kotlin.svg',
    Languages: { connect: { slug: 'kotlin' } },
  },
  {
    name: 'Elixir',
    slug: 'elixir',
    color: '#4B275F',
    Description: {
      create: {
        fa: 'الیکسیر یک زبان برنامه‌نویسی فانکشنال، همزمان و همه‌منظوره است که بالای اِرلنگ ساخته می‌شود و ابسترکشن‌های مشابهی را برای ساخت برنامه‌ها به اشتراک می‌گذارد.',
        en: 'Elixir is a functional, concurrent, general-purpose programming language. It builds on top of Erlang and shares the same abstractions.',
      },
    },
    image: 'https://simpleicons.org/icons/elixir.svg',
    Languages: { connect: { slug: 'elixir' } },
  },
  {
    name: 'Go',
    slug: 'go',
    color: '#00ADD8',
    Description: {
      create: {
        fa: 'گو یک زبان برنامه‌نویسی تایپ‌شده و کامپایل‌شده است که توسط گوگل طراحی شده است. از لحاظ ساختاری شبیه C است اما با ایمنی حافظه، جمع‌آوری زباله و تایپ ساختاری و...',
        en: 'Go is a statically typed, compiled programming language designed at Google. It is syntactically similar to C, but with memory safety, garbage collection, structural typing, and CSP-style',
      },
    },
    image: 'https://simpleicons.org/icons/go.svg',
    Languages: { connect: { slug: 'go' } },
  },
  {
    name: 'Ruby',
    slug: 'ruby',
    color: '#CC342D',
    Description: {
      create: {
        fa: 'روبی یک زبان برنامه‌نویسی تعبیر‌شده، سطح‌بالا و همه‌منظوره است که از چندین پارادایم برنامه‌نویسی پشتیبانی می‌کند و بر بهره‌وری و سادگی برنامه‌نویسی تاکید دارد.',
        en: 'Ruby is an interpreted, high-level, general-purpose programming language which supports multiple programming paradigms. It was designed with an emphasis on programming productivity and simplicity.',
      },
    },
    image: 'https://simpleicons.org/icons/ruby.svg',
    Languages: { connect: { slug: 'ruby' } },
  },
  {
    name: 'Java',
    slug: 'java',
    color: '#007396',
    Description: {
      create: {
        fa: 'جاوا یک زبان برنامه‌نویسی سطح‌بالا، مبتنی بر کلاس و شی‌گرا است که به گونه‌ای طراحی شده است که تا حد امکان وابستگی‌های پیاده سازی کم‌تری داشته باشد.',
        en: 'Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.',
      },
    },
    image: 'https://simpleicons.org/icons/java.svg',
    Languages: { connect: { slug: 'java' } },
  },
  {
    name: 'C',
    slug: 'c',
    color: '#A8B9CC',
    Description: {
      create: {
        fa: 'سی یک زبان برنامه‌نویسی کامپیوتری همه‌منظوره و رویه‌ای است که از برنامه‌نویسی ساخت یافته، دامنه متغیر واژگانی و بازگشت، با سیستم نوع ایستا پشتیبانی می‌کند.',
        en: 'C is a general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion, with a static type system.',
      },
    },
    image: 'https://simpleicons.org/icons/c.svg',
    Languages: { connect: { slug: 'c' } },
  },
  {
    name: 'C++',
    slug: 'cplusplus',
    color: '#00599C',
    Description: {
      create: {
        fa: 'سی++ یک زبان برنامه‌نویسی همه‌منظوره است که به‌عنوان گسترش‌دهنده زبان سی، یا "سی به‌همراه کلاس‌ها" ساخته شده است.',
        en: 'C++ is a general-purpose programming language that works as an extension of the C programming language, or "C with Classes".',
      },
    },
    image: 'https://simpleicons.org/icons/cplusplus.svg',
    Languages: { connect: { slug: 'cplusplus' } },
  },
  {
    name: 'C#',
    slug: 'csharp',
    color: '#239120',
    Description: {
      create: {
        fa: 'سی‌شارپ یک زبان برنامه‌نویسی همه‌منظوره و چند‌پارادایم است که در زمینه‌های مختلفی کاربرد دارد.',
        en: 'C# is a general-purpose, multi-paradigm programming language.',
      },
    },
    image: 'https://simpleicons.org/icons/csharp.svg',
    Languages: { connect: { slug: 'csharp' } },
  },
  {
    name: 'Zig',
    slug: 'zig',
    color: '#F7A41D',
    image: 'https://simpleicons.org/icons/zig.svg',
    Description: {
      create: {
        fa: 'زیگ یک زبان برنامه‌نویسی همه‌منظوره، تایپ ایستا و کامپایل‌شده است که برای استحکام، بهینه‌بودن و قابلیت نگهداری  طراحی شده است.',
        en: 'Zig is an imperative, general-purpose, statically typed, compiled system programming language, designed for "robustness, optimality and maintainability".',
      },
    },
    Languages: { connect: { slug: 'zig' } },
  },
  {
    name: 'Laravel',
    slug: 'laravel',
    color: '#FF2D20',
    Description: {
      create: {
        fa: 'لاراول یک فریم‌ورک آزاد و متن‌باز برای پی‌اچ‌پی است که برای توسعه برنامه‌های کاربردی وب با الگور معماری MVC ساخته شده است.',
        en: 'Laravel is a free, open-source PHP web framework intended for the development of web applications following the MVC architectural pattern.',
      },
    },
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
    Description: {
      create: {
        fa: 'دات‌نت یک فریم‌ورک نرم‌افزاری است که توسط مایکروسافت توسعه یافته و عمدتاً روی ویندوز مایکروسافت اجرا می‌شود.',
        en: '.NET is a software framework created by Microsoft and primarily runs on Microsoft Windows.',
      },
    },
    image: 'https://simpleicons.org/icons/dotnet.svg',
    Topics: { connect: ['dotnet'].map((topic) => ({ name: topic })) },
    terms: ['dotnet', 'دات نت', 'دات‌نت'],
  },
  {
    name: 'Django',
    slug: 'django',
    color: '#092E20',
    Description: {
      create: {
        fa: 'جنگو یک فریم‌ورک وب آزاد و متن‌باز مبتنی بر پایتون است که از الگوی معماری MVT پیروی می‌کند.',
        en: 'Django is a Python-based free and open-source web framework that follows the MVT architectural pattern.',
      },
    },
    image: 'https://simpleicons.org/icons/django.svg',
    Topics: { connect: ['django'].map((topic) => ({ name: topic })) },
    terms: ['django', 'جنگو'],
    Languages: { connect: { slug: 'python' } },
  },
  {
    name: 'Node.js',
    slug: 'nodejs',
    color: '#339933',
    Description: {
      create: {
        fa: 'نود‌جی‌اس یک محیط امن اجرای جاوا‌اسکریپت به‌صورت متن‌باز و چند‌پلتفرمی برای توسعه سمت سرور است که بر روی موتور V8 اجرا می‌شود و جاوا‌اسکریپت را خارج از مرورگر وب اجرا می‌کند.',
        en: 'Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.',
      },
    },
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
    Description: {
      create: {
        fa: 'فلاتر یک کیت توسعه نرم‌افزار رابط کاربری منبع‌باز است که توسط گوگل ایجاد شده و برای توسعه برنامه‌های کاربردی برای پلتفرم‌های مختلف با استفاده از یک پایگاه کد واحد استفاده می‌شود.',
        en: 'Flutter is an open-source UI software development kit created by Google. It is used to develop cross platform applications from a single codebase.',
      },
    },
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
    Description: {
      create: {
        fa: 'ری‌اکت یک کتابخانه فرانت‌اند جاوا‌اسکریپتی آزاد و متن‌باز، ساخته شده توسط متا‌ (فیس‌بوک) است که می‌تواند برای ساخت رابط‌های کاربری برنامه‌های تک‌صفحه‌ای استفاده شود.',
        en: 'Vue.js is an open-source frontend JavaScript framework created by Meta Platforms, Inc. for building user interfaces and single-page applications.',
      },
    },
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
    Description: {
      create: {
        fa: 'ری‌اکت نیتیو یک فریمورک طراحی رابط کاربری ساخته شده توسط متا (فیس‌بوک) است که برای توسعه برنامه‌های کاربردی اندروید، iOS، ویندوز و... کاربرد دارد.',
        en: 'React Native is an open-source UI software framework created by Meta Platforms, Inc. It is used to develop applications for Android, iOS, Windows, macOS and more.',
      },
    },
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
    Description: {
      create: {
        fa: 'ویو‌جی‌اس یک فریم‌ورک جاوا‌اسکریپتی متن‌باز فرانت‌اند است که برای ساخت رابط‌های کاربری و برنامه‌های تک‌صفحه‌ای استفاده می‌شود.',
        en: 'Vue.js is an open-source frontend JavaScript framework for building user interfaces and single-page applications',
      },
    },
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
    Description: {
      create: {
        fa: 'سولت یک کامپایلر فرانت‌اند آزاد و متن‌باز است و بیلد نهایی آن شامل کد فریم‌ورک نمی‌شود.',
        en: 'Svelte is a free and open-source frontend compiler. Svelte apps do not include a framework script.',
      },
    },
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
    Description: {
      create: {
        fa: 'انگولار یک فریم‌ورک متن‌باز برنامه وب تایپ‌اسکریپتی است که توسط تیم انگولار در گوگل و جامعه‌ای از افراد و شرکت‌های دیگر هدایت می‌شود و یک بازنویسی از انگولار‌جی‌اس است.',
        en: 'Angular is a TypeScript-based free and open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations. Angular is a complete rewrite from the same team that built AngularJS.',
      },
    },
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
    Description: {
      create: {
        fa: 'نست‌جی‌اس یک فریمورک پیشرو و محبوب نود‌جی‌اس برای ساخت برنامه‌های کاربردی کارآمد و مقیا‌س‌پذیر در سمت سرور است.',
        en: 'NestJS is a progressive Node.js framework for building efficient, reliable and scalable server-side applications.',
      },
    },
    Topics: {
      connect: ['nestjs', 'nest'].map((topic) => ({
        name: topic,
      })),
    },
    Languages: { connect: { slug: 'typescript' } },
    terms: ['nestjs', 'nest.js', 'nest'],
  },
  {
    name: 'Awesome Lists',
    slug: 'awesome-lists',
    color: '#FC60A8',
    Description: {
      create: {
        fa: 'فهرست‌های شگفت‌انگیز یا Awesome Lists فهرست‌های مدیریت‌شده‌ای از پروژه‌های کد در یک دامنه، برنامه یا کاربرد خاص هستند.',
        en: 'Awesome Lists are community curated lists of code projects within a specific domain, application, or use case.',
      },
    },
    image: 'https://simpleicons.org/icons/awesomelists.svg',
    Topics: {
      connect: ['awesome-list'].map((topic) => ({
        name: topic,
      })),
    },
    terms: ['awesome-'],
  },
  {
    name: 'Wordpress',
    slug: 'wordpress',
    color: '#21759B',
    Description: {
      create: {
        fa: 'وردپرس یک سیستم مدیریت محتوای آزاد و متن‌باز است که در زبان PHP نوشته شده و از دیتابیس MySQL یا MariaDB استفاده می‌کند.',
        en: 'WordPress is a free and open-source content management system written in PHP and paired with a MySQL or MariaDB database.',
      },
    },
    image: 'https://simpleicons.org/icons/wordpress.svg',
    Topics: {
      connect: ['wordpress'].map((topic) => ({
        name: topic,
      })),
    },
    terms: ['wp-', 'wordpress', 'وردپرس', 'woocommerce', 'ووکامرس'],
  },
  {
    name: 'Telegram',
    slug: 'telegram',
    color: '#26A5E4',
    Description: {
      create: {
        fa: 'تلگرام یک سرویس پیام‌رسان رایگان، چند‌پلتفرمی و مبتنی بر ابر است. در این مجموعه پروژه‌های مربوط به این پیام‌رسان گرد آمده‌اند.',
        en: 'Telegram is a freeware, cross-platform, cloud-based instant messaging service. The projects in this collection are all about Telegram.',
      },
    },
    image: 'https://simpleicons.org/icons/telegram.svg',
    Topics: {
      connect: ['telegram'].map((topic) => ({
        name: topic,
      })),
    },
    terms: ['telegram', 'تلگرام', 'تلگرم'],
  },
  {
    name: 'Instagram',
    slug: 'instagram',
    color: '#E4405F',
    Description: {
      create: {
        fa: 'اینستاگرام یک سرویس شبکه‌اجتماعی اشتراک‌گذاری عکس و ویدیو است. در این مجموعه پروژه‌های مربوط به این شبکه‌اجتماعی گرد آمده‌اند.',
        en: 'Instagram is an American photo and video sharing social networking service. The projects in this collection are all about Instagram.',
      },
    },
    image: 'https://simpleicons.org/icons/instagram.svg',
    Topics: {
      connect: ['instagram'].map((topic) => ({
        name: topic,
      })),
    },
    terms: ['instagram', 'اینستاگرام', 'اینستاگرم'],
  },
  {
    name: 'Twitter',
    slug: 'twitter',
    color: '#1DA1F2',
    Description: {
      create: {
        fa: 'توییتر یک سرویس شبکه‌اجتماعی و میکرو‌بلاگ است. در این مجموعه پروژه‌های مربوط به این شبکه‌اجتماعی گرد آمده‌اند.',
        en: 'Twitter is an American microblogging and social networking service. The projects in this collection are all about Twitter.',
      },
    },
    image: 'https://simpleicons.org/icons/twitter.svg',
    Topics: {
      connect: ['twitter'].map((topic) => ({
        name: topic,
      })),
    },
    terms: ['twitter', 'تویتر', 'توییتر', 'توئیتر'],
  },
  {
    name: 'Discord',
    slug: 'discord',
    color: '#5865F2',
    Description: {
      create: {
        fa: 'دیسکورد یک پلتفرم پیام‌رسان، تماس تصویری و صوتی است. در این مجموعه پروژه‌های مربوط به این پلتفرم گرد آمده‌اند.',
        en: 'Discord is a VoIP, instant messaging and digital distribution platform. The projects in this collection are all about Discord.',
      },
    },
    image: 'https://simpleicons.org/icons/discord.svg',
    Topics: {
      connect: ['discord'].map((topic) => ({
        name: topic,
      })),
    },
    terms: ['discord', 'دیسکورد', 'دیسکرد'],
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
  // for (const item of data) {
  //   await prisma.collection.upsert({
  //     where: { slug: item.slug },
  //     create: item,
  //     update: item,
  //   });
  // }
};

main();
