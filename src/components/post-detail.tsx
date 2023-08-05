"use client";

import { getPostDetail } from "@/helpers/posts/get-post-detail";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Skeleton } from "@/ui/skeleton";
import Image from "next/image";
import { FC } from "react";

interface PostDetailProps {
  slug: string;
}

const PostDetail: FC<PostDetailProps> = ({ slug }) => {
  const {
    data: postDetail,
    isLoading: isLoadingPostDetail,
    isError: isErrorPostDetail,
  } = getPostDetail(slug);

  return (
    <>
      {isLoadingPostDetail && (
        <div className="text-center">
          <div className="flex justify-center gap-2">
            <Skeleton className="mt-3 w-[55.22px] h-[22px]" />
          </div>
          <div className="flex flex-col items-center max-w-3xl gap-1 px-4 mx-auto mt-3 mb-6 scroll-m-20">
            <Skeleton className="h-[36px] w-full max-w-2xl" />
            <Skeleton className="h-[36px] w-full max-w-sm" />
            <Skeleton className="h-[36px] w-full md:hidden" />
            <Skeleton className="h-[36px] w-full md:hidden" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-2">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-[97.58px] h-[20px]" />
            </div>
            <Skeleton className="w-2 h-2 rounded-full" />
            <Skeleton className="w-[91.05px] h-[20px]" />
          </div>

          <div className="my-8 md:mb-6">
            <Skeleton className="rounded-xl lg:max-w-5xl mx-auto h-[214.75px] md:h-[340px] lg:h-[540px] xl:h-[684px]" />
          </div>

          <div className="flex flex-col max-w-3xl gap-1 mx-auto mt-8">
            <Skeleton className="h-[28px] w-full" />
            <Skeleton className="h-[28px] w-full" />
            <Skeleton className="h-[28px] w-full" />
            <Skeleton className="h-[28px] w-full" />
            <Skeleton className="h-[28px] w-full" />
            <Skeleton className="h-[28px] w-full" />
            <Skeleton className="h-[28px] w-full" />
          </div>

          <div className="mt-[1.8666667em] mb-[1.0666667em] max-w-3xl mx-auto">
            <Skeleton className="h-[39.98px] w-40" />
          </div>

          <div className="flex flex-col max-w-3xl gap-1 mx-auto mb-[1.3333333em]">
            <Skeleton className="h-[28px] w-full" />
            <Skeleton className="h-[28px] w-full" />
            <Skeleton className="h-[28px] w-full" />
            <Skeleton className="h-[28px] w-full" />
            <Skeleton className="h-[28px] w-full" />
            <Skeleton className="h-[28px] w-full" />
            <Skeleton className="h-[28px] w-full" />
          </div>

          <div className="mt-[1.8666667em] mb-[1.0666667em] max-w-3xl mx-auto">
            <Skeleton className="h-[39.98px] w-40" />
          </div>

          <div className="flex flex-col max-w-3xl gap-1 mx-auto mb-[1.3333333em]">
            <Skeleton className="h-[28px] w-full" />
            <Skeleton className="h-[28px] w-full" />
            <Skeleton className="h-[28px] w-full" />
            <Skeleton className="h-[28px] w-full" />
            <Skeleton className="h-[28px] w-full" />
            <Skeleton className="h-[28px] w-full" />
            <Skeleton className="h-[28px] w-full" />
          </div>
        </div>
      )}

      {isErrorPostDetail && (
        <div className="flex items-center justify-center min-h-screen text-center">
          <div className="flex justify-center gap-2">
            <p className="mt-3 text-lg font-semibold text-red-500">
              Something went wrong
            </p>
          </div>
        </div>
      )}

      {!isLoadingPostDetail && !isErrorPostDetail && postDetail && (
        <section className="py-8 sm:py-16 lg:py-20">
          <article>
            <header className="text-center">
              <div className="flex justify-center gap-2">
                {postDetail.metadata.tags.map((tag: string, index: number) => (
                  <Badge
                    key={`tags-${index}`}
                    className={cn(
                      "mt-3 bg-emerald-500 shadow hover:bg-emerald-500/80 dark:bg-emerald-600 dark:hover:bg-emerald-600/80 dark:text-zinc-50"
                    )}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="max-w-3xl px-4 mx-auto mt-3 mb-6 text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl sm:px-6">
                {postDetail.metadata.title}
              </h1>
              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center justify-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={postDetail.metadata.author.avatar_url}
                      alt={postDetail.metadata.author.name}
                    />
                    <AvatarFallback>
                      {postDetail.metadata.author.avatar_fallback}
                    </AvatarFallback>
                  </Avatar>

                  <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">
                    {postDetail.metadata.author.name}
                  </p>
                </div>

                <span className="w-2 h-2 bg-gray-400 rounded-full" />

                <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">
                  {postDetail.metadata.created_at}
                </p>
              </div>

              {postDetail.metadata.banner ? (
                <div className="my-8 md:mb-6">
                  <AspectRatio
                    ratio={16 / 9}
                    className={cn(
                      "bg-zinc-900/10 dark:bg-zinc-50/10 rounded-xl overflow-hidden mx-auto lg:max-w-5xl h-[214.75px] md:h-auto"
                    )}
                  >
                    <Image
                      src={postDetail.metadata.banner}
                      className="object-cover object-center"
                      sizes="(max-width: 900px) 400px, 900px"
                      alt={postDetail.metadata.title}
                      fill
                      unoptimized
                      loader={({ src }) => src}
                    />
                  </AspectRatio>
                </div>
              ) : (
                <div className="my-8 md:mb-6">
                  <div className="bg-zinc-900/10 dark:bg-zinc-50/10 rounded-xl lg:max-w-5xl mx-auto h-[214.75px] md:h-[340px] lg:h-[540px] xl:h-[684px]" />
                </div>
              )}
            </header>

            <div
              className="max-w-3xl mx-auto mt-8 prose prose-lg prose-headings:font-heading prose-headings:leading-tighter prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-emerald-600 prose-img:rounded-md prose-img:shadow-lg dark:prose-invert dark:prose-headings:text-zinc-300 dark:prose-a:text-emerald-400 lg:prose-xl"
              dangerouslySetInnerHTML={{ __html: postDetail.html }}
            />
          </article>
        </section>
      )}

      {!isLoadingPostDetail && !isErrorPostDetail && !postDetail && (
        <div className="flex items-center justify-center min-h-screen text-center">
          <div className="flex justify-center gap-2">
            <p className="mt-3 text-lg font-semibold text-red-500">
              Something went wrong
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetail;
