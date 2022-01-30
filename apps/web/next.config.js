const withNx = require('@nrwl/next/plugins/with-nx');

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
  ...withNx(nextConfig), async redirects() {
    return [
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
