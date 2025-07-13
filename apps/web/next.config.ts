const { withContentlayer } = require("next-contentlayer");
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config: { resolve: { alias: any; }; }) => {
    // Ensure contentlayer config is resolved from root
    config.resolve.alias = {
      ...config.resolve.alias,
      'contentlayer/generated': path.resolve(__dirname, '../../.contentlayer/generated')
    };
    return config;
  }
};

module.exports = withContentlayer(nextConfig);
