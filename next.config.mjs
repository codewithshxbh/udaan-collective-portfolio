let userConfig = undefined
try {
  // try to import ESM first
  userConfig = await import('./v0-user-next.config.mjs')
} catch (e) {
  try {
    // fallback to CJS import
    userConfig = await import("./v0-user-next.config");
  } catch (innerError) {
    // ignore error
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable experimental features that might cause webpack issues
  experimental: {
    webpackBuildWorker: false,
    parallelServerBuildTraces: false,
    parallelServerCompiles: false,
  },
  // Add webpack configuration to fix the WasmHash issue
  webpack: (config) => {
    // Fix WasmHash error by replacing the default hash function
    config.optimization.moduleIds = 'named';
    
    // Prevent Webpack from using WasmHash
    if (config.output) {
      config.output.hashFunction = 'xxhash64';
    }
    
    return config;
  },
}

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig
