/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      // For Next.js multi-zone deployment, catch our current paths before redirecting for zones.
      {
        source: "/:path*",
        destination: `/:path*`,
      },
      {
        source: "/boggle",
        // Boggle is hosted on a custom domain, so Vercel can display it to search engines.
        destination: "https://boggle.plett.fun/boggle",
      },
      {
        source: "/boggle/:path*",
        destination: "https://boggle.plett.fun/boggle/:path*",
      },
    ];
  },
};

export default nextConfig;
