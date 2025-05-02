/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Exclude Node.js specific modules and problematic HTML file
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        nock: false,
        child_process: false,
        'mock-aws-s3': false,
        'aws-sdk': false,
      };
    }

    // Add a rule to handle the problematic HTML file
    config.module.rules.push({
      test: /node_modules\/@mapbox\/node-pre-gyp\/lib\/util\/nw-pre-gyp\/index.html$/,
      use: 'raw-loader', // raw-loader allows to import HTML as a string
    });

    return config;
  },
};

export default nextConfig;
