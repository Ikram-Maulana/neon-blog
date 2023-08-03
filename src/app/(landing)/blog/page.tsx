import Posts from "@/components/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

const Blog = () => {
  return (
    <div className="container max-w-7xl">
      <section className="pb-6 scroll-mt-16" id="posts">
        <div className="max-w-6xl px-4 py-16 mx-auto xl:px-8 lg:py-20">
          <div className="mb-4">
            <div className="mb-12 text-center md:mx-auto">
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
                Our Blog
              </h1>
              <div className="max-w-3xl mx-auto">
                <p className="mb-6 text-xl text-gray-600 dark:text-zinc-400">
                  A center of knowledge and information about the world of
                  programming and technology.
                </p>
              </div>
            </div>
          </div>

          <Posts />
        </div>
      </section>
    </div>
  );
};

export default Blog;
