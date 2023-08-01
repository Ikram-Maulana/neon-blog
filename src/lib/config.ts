export const SITE = {
  name: "Neon Blog",

  origin: "https://neon-blog.vercel.app",
  basePathname: "/",
  trailingSlash: false,

  title: "Neon Blog | Next.js and Notion Powered Blog",
  description:
    "A Next.js blog site that uses a new application router powered by the Notion Public API.",
  applicationName: "Neon Blog",
  keywords: [
    "nextjs",
    "notion",
    "notion-api",
    "notion-blog",
    "nextjs13",
    "app-router",
    "nextjs-notion-blog",
  ],
  authors: [
    {
      name: "Ikram Maulana",
      url: "https://ikram-maulana.tech",
    },
  ],
  creator: "Ikram Maulana",
  themeColor: "#F9F5EB",
};

export const NAVBAR = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Blog",
    href: "/blog",
  },
];

export const NAVBAR_MOBILE = [
  {
    name: "Home",
    href: "/",
    newPage: false,
  },
  {
    name: "Blog",
    href: "/blog",
    newPage: false,
  },
  {
    name: "Developer",
    href: "https://ikram-maulana.tech",
    newPage: true,
  },
  {
    name: "Github",
    href: "https://github.com/Ikram-Maulana/neon-blog",
    newPage: true,
  },
];
