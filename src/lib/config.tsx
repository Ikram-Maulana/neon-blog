import {
  CodeIcon,
  FileTextIcon,
  LightningBoltIcon,
  Link2Icon,
  MixerHorizontalIcon,
  NotionLogoIcon,
  RocketIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";

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
  icons: [
    {
      rel: "favicon",
      url: "/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
  ],
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

export const FEATURES = [
  {
    title: "Blazing Fast",
    icon: LightningBoltIcon,
  },
  {
    title: "Always Available",
    icon: UpdateIcon,
  },
  {
    title: "Minimalist Design",
    icon: RocketIcon,
  },
  {
    title: "Customizable",
    icon: MixerHorizontalIcon,
  },
  {
    title: "MIT Licensed",
    icon: FileTextIcon,
  },
  {
    title: "Content via Notion",
    icon: NotionLogoIcon,
  },
  {
    title: "SEO Friendly",
    icon: Link2Icon,
  },
  {
    title: "Open New Idea",
    icon: CodeIcon,
  },
];
