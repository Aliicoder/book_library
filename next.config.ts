import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'ik.imagekit.io' },
    ],
  },
  // ⚡ Enable Strict Mode (Recommended for catching React issues)
  // reactStrictMode: true,

  // ⚡ Use SWC for Faster Minification (Recommended)
  // swcMinify: true,

  // ⚡ Change the Build Output Folder (Default is `.next/`)
  //distDir: 'build',
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },

  //output: 'standalone', // Required for Vercel
  // ⚡ Optimize Fonts & CSS
  // optimizeFonts: true,
  // optimizeCss: true,

  // ⚡ Configure External Images (Uncomment & Add Domains)

  // ⚡ Enable Internationalization (i18n)
  // i18n: {
  //   locales: ['en', 'fr', 'es'],
  //   defaultLocale: 'en',
  // },

  // ⚡ Experimental Features (Uncomment to Enable)
  experimental: {
    // =scrollRestoration: true, // Maintain Scroll Position
  },

  // ⚡ Customize Webpack (Fix fs Issues in Client Side Code)
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = { fs: false };
  //   }
  //   return config;
  // },

  // ⚡ Set Custom Headers (Security, CORS, CSP, etc.)
  // async headers() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       headers: [
  //         { key: 'Access-Control-Allow-Origin', value: '*' },
  //         { key: 'Content-Security-Policy', value: "default-src 'self'" },
  //       ],
  //     },
  //   ];
  // },

  // ⚡ Set Redirects (Old URL -> New URL)
  // async redirects() {
  //   return [
  //     {
  //       source: '/old-route',
  //       destination: '/new-route',
  //       permanent: true,
  //     },
  //   ];
  // },

  // ⚡ Enable Static Export Mode (`next export`)
  // output: 'export',

  // ⚡ Base Path & Asset Prefix (For Hosting Under a Subdirectory)
  // basePath: '/my-app',
  // assetPrefix: '/my-app/',

  // ⚡ Set Environment Variables (Accessible in Code)
  // env: {
  //   NEXT_PUBLIC_API_URL: 'https://api.example.com',
  // },

  // ⚡ Increase API Request Body Size Limit
  // api: {
  //   bodyParser: {
  //     sizeLimit: '1mb',
  //   },
  // },
}

export default nextConfig
