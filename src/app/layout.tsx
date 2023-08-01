import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
import { SITE } from "@/lib/config";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE.name}`,
    default: SITE.title,
  },
  description: SITE.description,
  applicationName: SITE.applicationName,
  keywords: SITE.keywords,
  authors: SITE.authors,
  creator: SITE.creator,
  themeColor: SITE.themeColor,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "motion-safe:scroll-smooth bg-white antialiased",
        inter.className
      )}
    >
      <body className="min-h-screen antialiased bg-zinc-50 dark:bg-zinc-900">
        <Providers>
          <NextTopLoader height={3} />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
