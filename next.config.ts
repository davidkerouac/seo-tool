import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      // Redirect /en to / (canonical - avoid duplicate content)
      {
        source: "/en",
        destination: "/",
        permanent: true,
      },
      // Redirect /blog/index.html to /blog
      {
        source: "/blog/index.html",
        destination: "/blog",
        permanent: true,
      },
      // Redirect old .html blog URLs to clean slug URLs
      // e.g., /blog/codot-adhd.html → /blog/codot-adhd
      {
        source: "/blog/:slug(.*)\\.html",
        destination: "/blog/:slug",
        permanent: true,
      },
      // Redirect /private_policy.html to /privacy
      {
        source: "/private_policy.html",
        destination: "/privacy",
        permanent: true,
      },
      // Redirect any root-level .html pages
      {
        source: "/:page(.*)\\.html",
        destination: "/:page",
        permanent: true,
      },
      // Redirect old non-blog path: /best-productivity-apps-for-entrepreneurs
      {
        source: "/best-productivity-apps-for-entrepreneurs",
        destination: "/blog",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/blog/:locale/:category/:slug",
        destination: "/blog/:category/:slug",
      },
    ];
  },
};

export default nextConfig;
