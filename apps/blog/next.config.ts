const path = require("path");
const { withContentlayer } = require("next-contentlayer");

/** @type {import("next").NextConfig} */
const nextConfig = {
  webpack: (config: any) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "contentlayer/generated": path.resolve(__dirname, "../../.contentlayer/generated"),
    };
    return config;
  },
};

module.exports = withContentlayer(nextConfig);
