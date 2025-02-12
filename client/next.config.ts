/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/workspace-manager",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
