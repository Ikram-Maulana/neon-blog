"use client";

import { getPostHighlight } from "@/helpers/posts/get-post-highlight";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/ui/alert";
import { AspectRatio } from "@/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";
import { ArrowRightIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

const PostHighlight = () => {
  const { data: postHighlight, isLoading, isError } = getPostHighlight();

  return (
    <>
      {isLoading && (
        <div className="hidden lg:items-center lg:gap-6 lg:grid lg:grid-cols-2 lg:my-12">
          <Skeleton className="w-full h-[301.33px] xl:h-[354.66px] rounded-xl" />
          <div className="flex flex-col w-full">
            <div className="flex gap-2">
              <Skeleton className="w-16 h-[22px]" />
            </div>

            <div className="flex flex-col gap-1 mt-3">
              <Skeleton className="w-full h-[36px]" />
              <Skeleton className="w-full h-[36px]" />
            </div>

            <div className="flex flex-col gap-1 mt-3">
              <Skeleton className="w-full h-[28px]" />
              <Skeleton className="w-full h-[28px]" />
              <Skeleton className="w-full h-[28px]" />
            </div>

            <Skeleton className="mt-3 w-[127px] h-[36px]" />

            <div className="flex items-center gap-2 xl:mt-6 lg:mt-4">
              <Skeleton className="w-10 h-10 rounded-full" />

              <div className="flex flex-col gap-1">
                <Skeleton className="w-44 h-[28px]" />
                <Skeleton className="w-44 h-[20px]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {isError && (
        <div className="mb-0 md:my-12">
          <Alert
            variant="destructive"
            className={cn(
              "dark:border-red-400/50 dark:text-red-400 dark:dark:border-red-400 dark:[&>svg]:text-red-400"
            )}
          >
            <ExclamationTriangleIcon className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load posts highlight. Please try again.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {!isLoading &&
        !isError &&
        postHighlight &&
        postHighlight.posts.length !== 0 && (
          <>
            <div className="hidden lg:items-center lg:gap-6 lg:grid lg:grid-cols-2 lg:my-12">
              <AspectRatio
                ratio={3 / 2}
                className={
                  "bg-zinc-900/10 dark:bg-zinc-50/10 rounded-xl group overflow-hidden"
                }
              >
                <Link href={`/blog/${postHighlight.posts[0].slug}`}>
                  <Image
                    src={postHighlight.posts[0].banner}
                    alt={postHighlight.posts[0].title}
                    fill
                    className="object-cover object-center transition-all duration-200 rounded-md cursor-pointer group-hover:scale-110"
                    unoptimized
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    loader={({ src }) => src}
                  />
                </Link>
              </AspectRatio>
              <div className="flex flex-col w-full">
                <div className="flex gap-2">
                  {postHighlight.posts[0].tags.map(
                    (tag: string, index: number) => (
                      <Badge
                        key={`tagHighlight-${index}`}
                        className={cn(
                          "mt-3 bg-emerald-500 shadow hover:bg-emerald-500/80 dark:bg-emerald-600 dark:hover:bg-emerald-600/80 dark:text-zinc-50"
                        )}
                      >
                        {tag}
                      </Badge>
                    )
                  )}
                </div>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight transition-colors scroll-m-20 line-clamp-2">
                  {postHighlight.posts[0].title}
                </h2>
                <p className="mt-3 text-lg line-clamp-3">
                  {postHighlight.posts[0].excerpt}
                </p>

                <Button
                  className={cn(
                    "mt-3 w-fit flex gap-2 items-center justify-center"
                  )}
                  asChild
                >
                  <Link href={`/blog/${postHighlight.posts[0].slug}`}>
                    Read more <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </Button>

                <div className="flex items-center gap-2 xl:mt-6 lg:mt-4">
                  <Avatar>
                    <AvatarImage
                      src={postHighlight.posts[0].author.avatar_url}
                      alt={postHighlight.posts[0].author.name}
                    />
                    <AvatarFallback>
                      {postHighlight.posts[0].author.avatar_fallback}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-medium leading-7 line-clamp-1">
                      {postHighlight.posts[0].author.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Published at {postHighlight.posts[0].created_at}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
    </>
  );
};

export default PostHighlight;
