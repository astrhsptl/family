const withPWA = require('next-pwa')({
  dest: 'public',
});

module.exports = withPWA({
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: false,
  },
});
