/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return {
      beforeFiles: [
        // These rewrites are checked after headers/redirects
        // and before all files including _next/public files which
        // allows overriding page files
        {
          source: '/',
          destination: '/home'
        },
        {
          source: '/dashboard',
          destination: '/dashboard/sys'
          // has: [{ type: 'query', key: 'overrideMe' }],
        }
      ]
    }
  }
}

module.exports = nextConfig
