import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  
  // 确保输出目录配置正确
  distDir: '.next',
  
  // 构建优化
  experimental: {
    // 启用现代构建优化
    optimizePackageImports: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  },
  
  // 输出配置
  output: 'standalone',
  
  // 压缩配置
  compress: true,
};

export default nextConfig;
