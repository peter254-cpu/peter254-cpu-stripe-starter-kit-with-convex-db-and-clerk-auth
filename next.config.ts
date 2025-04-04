import type { NextConfig } from "next";

// Define the Next.js configuration with detailed options
const nextConfig: NextConfig = {
  // Enabling React Strict Mode for detecting potential issues
  reactStrictMode: true,

  // Configuring supported image domains for next/image
  images: {
    domains: ["example.com", "i3.ytimg.com"], // Add external image hostnames here
  },

  // Customizing environment variables (if needed)
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL, // Example environment variable
  },

  // Configuring headers for improved security (optional)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
};

export default nextConfig;
