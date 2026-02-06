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
      // Redirect non-existent pages to appropriate existing pages
      {
        source: "/careers",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/legal",
        destination: "https://codot.ai/privacy_policy",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "https://codot.ai/privacy_policy",
        permanent: true,
      },
      {
        source: "/community",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/changelog",
        destination: "/",
        permanent: true,
      },
      {
        source: "/docs",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/smart-tags",
        destination: "/features",
        permanent: true,
      },
      {
        source: "/voice-assistant",
        destination: "/features",
        permanent: true,
      },
      {
        source: "/task-organization",
        destination: "/features",
        permanent: true,
      },
      {
        source: "/ai-learning",
        destination: "/features",
        permanent: true,
      },
      {
        source: "/knowledge-base",
        destination: "/faq",
        permanent: true,
      },
      // Redirect all privacy pages (including locale versions) to external privacy policy
      {
        source: "/privacy",
        destination: "https://codot.ai/privacy_policy",
        permanent: true,
      },
      {
        source: "/:locale(zh|ja|ko|ar|de|fr|es|ru|it|nl|pt|sv|no|da|fi)/privacy",
        destination: "https://codot.ai/privacy_policy",
        permanent: true,
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
