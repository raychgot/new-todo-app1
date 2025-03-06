const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add fallbacks for 'crypto', 'stream', and 'vm' modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    vm: require.resolve('vm-browserify'),
  };

  // Enable code splitting
  config.optimization.splitChunks = {
    chunks: 'all',
    maxSize: 200000, // Split chunks into smaller files (200 KB)
  };

  return config;
};