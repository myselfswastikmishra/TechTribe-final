import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // This is to fix a build error with genkit, which has optional
    // dependencies that are not always installed.
    config.externals.push(
      '@opentelemetry/exporter-jaeger',
      '@opentelemetry/winston-transport'
    );
    return config;
  },
};

export default nextConfig;
