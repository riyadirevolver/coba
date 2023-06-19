module.exports = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ["localhost", "api.peluangkerjaku.com", "api-pro.dikahadir.com"],
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
