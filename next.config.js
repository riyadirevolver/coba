module.exports = {
  /* config options here */
  // basePath: "/job-connector",
  reactStrictMode: false,
  images: {
    domains: ["api-dev.dikahadir.com"],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/authentication/login",
        permanent: false,
      },
    ];
  },
};
