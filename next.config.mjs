/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      // Only exclude fs from client-side bundle
      if (!isServer) {
        config.resolve.fallback = {
          fs: false,  // Prevent bundling fs for client-side code
          // You can also add other Node.js modules here if necessary
          path: false,
          os: false,
          crypto: false,
        };
      }
      return config;
    },
  };
  
  export default nextConfig;