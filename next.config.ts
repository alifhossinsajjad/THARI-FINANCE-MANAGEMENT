/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination:
          "https://overapprehensive-optatively-meri.ngrok-free.dev/api/v1/:path*",
        // https://overapprehensive-optatively-meri.ngrok-free.dev/api/v1
        // http://103.174.189.183:8081/api/v1
      },
    ];
  },
};
