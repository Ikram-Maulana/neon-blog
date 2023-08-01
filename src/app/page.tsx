import { FEATURES, SITE } from "@/lib/config";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Home | ${SITE.name}`,
};

export default function Home() {
  return (
    <div className="container max-w-7xl">
      <section id="hero" className="py-12 md:py-20">
        <div className="max-w-4xl pb-10 mx-auto text-center md:pb-16">
          <Image
            priority
            src="/vercel-and-notion.webp"
            alt="Next.js and Notion"
            width={400}
            height={150}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
            className="z-10 mx-auto mb-6"
          />
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
            Next.js blog site using Notion Public API and Tailwind CSS
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="mb-6 text-xl text-gray-600 dark:text-zinc-400">
              Neon Blog is an example of a Next.js blog site that uses a new
              application router powered by the Notion Public API. The data
              comes from{" "}
              <Link
                href="#"
                className="underline underline-offset-2 decoration-dotted decoration-emerald-500 dark:decoration-emerald-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                this table
              </Link>
              , and you can get the source code on{" "}
              <Link
                href="https://github.com/Ikram-Maulana/neon-blog"
                className="underline underline-offset-2 decoration-dotted decoration-emerald-500 dark:decoration-emerald-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="pb-6 scroll-mt-16" id="features">
        <div className="max-w-6xl px-4 py-16 mx-auto lg:px-8 lg:py-20">
          <div className="mb-4">
            <div className="mb-12 text-center md:mx-auto">
              <p className="mb-1 font-semibold tracking-wide uppercase text-emerald-500 dark:text-emerald-400">
                Features
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight transition-colors scroll-m-20 first:mt-0">
                What makes Neon Blog special?
              </h2>
            </div>
          </div>

          <div className="grid items-center grid-cols-3 gap-4 mb-0 dark:text-white sm:grid-cols-2 md:my-12 lg:grid-cols-4">
            {FEATURES.map(({ title, icon: Icon }, index) => (
              <div
                key={`feature-${index}`}
                className="col-span-3 mb-4 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1"
              >
                <div className="flex items-center flex-flow">
                  <div className="mb-4 mr-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-emerald-500 dark:bg-emerald-600">
                      {Icon && (
                        <Icon className="w-5 h-5 text-zinc-50 dark:text-zinc-200" />
                      )}
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-bold tracking-tight scroll-m-20">
                    {title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-6 scroll-mt-16" id="latest">
        <div className="max-w-6xl px-4 py-16 mx-auto lg:px-8 lg:py-20">
          <div className="mb-4">
            <div className="mb-12 text-center md:mx-auto">
              <p className="mb-1 font-semibold tracking-wide uppercase text-emerald-500 dark:text-emerald-400">
                Blog
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight transition-colors scroll-m-20 first:mt-0">
                Latest Posts
              </h2>
            </div>
          </div>

          {/* <div className="grid items-center grid-cols-3 gap-4 mb-0 dark:text-white sm:grid-cols-2 md:my-12 lg:grid-cols-4">
            {FEATURES.map(({ title, icon: Icon }, index) => (
              <div
                key={`feature-${index}`}
                className="col-span-3 mb-4 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1"
              >
                <div className="flex items-center flex-flow">
                  <div className="mb-4 mr-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-emerald-500 dark:bg-emerald-600">
                      {Icon && (
                        <Icon className="w-5 h-5 text-zinc-50 dark:text-zinc-200" />
                      )}
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-bold tracking-tight scroll-m-20">
                    {title}
                  </h3>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </section>
    </div>
  );
}
