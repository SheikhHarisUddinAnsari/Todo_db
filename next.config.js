/** @type {import('next').NextConfig} */
const nextConfig = {fastRefresh: false,
    async rewrites() {
        return [
          {
            source: "/api/:path*",
            destination: "http://localhost:3000/api/:path*",
          },
        ]
      },
    
}

module.exports = nextConfig
