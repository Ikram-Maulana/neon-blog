import { SITE } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Page Not Found | ${SITE.name}`,
};

const pageNotFound = () => {
  return (
    <section className="container flex flex-col items-center justify-center h-screen mx-auto text-center max-w-7xl dark:text-zinc-50">
      <h1 className="mb-6 font-extrabold tracking-tight text-8xl lg:text-9xl text-emerald-500 dark:text-emerald-400 scroll-m-20">
        404
      </h1>
      <h2 className="mb-6 text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
        Page Not Found
      </h2>
      <div className="max-w-3xl mx-auto">
        <p className="mb-6 text-xl text-gray-600 dark:text-zinc-400">
          The page you&apos;re looking for does not exist or an other error
          occurred, please go back to the homepage.
        </p>
      </div>
      <Button
        className={cn(
          "bg-emerald-500 hover:bg-emerald-500/90 dark:bg-emerald-600 dark:hover:bg-emerald-600/90 dark:text-zinc-50"
        )}
        asChild
      >
        <Link href="/">
          <ChevronLeftIcon className="w-4 h-4 mr-2" />
          Home
        </Link>
      </Button>
    </section>
  );
};

export default pageNotFound;
