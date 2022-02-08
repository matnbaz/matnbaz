const withNx = require('@nrwl/next/plugins/with-nx');
const { i18n } = require('./next-i18next.config');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'raw.githubusercontent.com'],
  },
};

module.exports = {
  ...withNx(nextConfig),
  i18n,
  async redirects() {
    return [
      {
        source: "/explorer/:path*",
        destination: "/explore/:path*",
        permanent: false,
      },
      {
        source: "/selections",
        destination: "/blog",
        permanent: false,
      },
      {
        source: "/s",
        destination: "/blog",
        permanent: false,
      },
      {
        source: "/c/:path*",
        destination: "/collections/:path*",
        permanent: false,
      }
    ]
  }
};
