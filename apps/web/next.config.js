const { i18n } = require('./next-i18next.config');
const withTM = require("next-transpile-modules")(["common"]);

module.exports = withTM({
  i18n,
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'raw.githubusercontent.com'],
  },
  typescript: {
    ignoreBuildErrors: true
  },
  async redirects() {
    return [
      {
        source: "/github/top-users",
        destination: "/github/users",
        permanent: false
      },
      {
        source: "/github/top-orgs",
        destination: "/github/organizations",
        permanent: false
      },
      {
        source: "/github/top-organizations",
        destination: "/github/organizations",
        permanent: false
      },
      {
        source: "/github/orgs",
        destination: "/github/organizations",
        permanent: false
      },
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
});
