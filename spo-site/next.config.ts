import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    formats: ["image/webp"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
}

export default nextConfig
