"use client";

import PostCard from "@/components/post-card";
import PostCardSkeleton from "@/components/post-card-skeleton";
import { getPostsLimit } from "@/helpers/posts/get-posts-limit";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/ui/alert";
import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";
import {
  ArrowRightIcon,
  ExclamationTriangleIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

const PostsLimit = () => {
  const { data: postsLimit, isLoading, isError } = getPostsLimit();

  return (
    <>
      {isLoading && (
        <>
          <div className="grid grid-cols-1 gap-6 mb-6 md:my-12 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <PostCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
          <div className="flex justify-center w-full sm:w-auto">
            <Skeleton className="h-9 w-[102px] rounded-md" />
          </div>
        </>
      )}

      {isError && (
        <div className="mb-0 h-60 md:my-12 md:h-64 lg:h-60 xl:h-72">
          <Alert
            variant="destructive"
            className={cn(
              "dark:border-red-400/50 dark:text-red-400 dark:dark:border-red-400 dark:[&>svg]:text-red-400"
            )}
          >
            <ExclamationTriangleIcon className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load posts. Please try again.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {!isLoading &&
        !isError &&
        postsLimit &&
        postsLimit.posts.length !== 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 mb-6 md:my-12 md:grid-cols-2 lg:grid-cols-3">
              {postsLimit.posts.map((post: any) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>
            <div className="flex justify-center w-full sm:w-auto">
              <Button asChild>
                <Link href="/blog">
                  See All <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </>
        )}

      {!isLoading &&
        !isError &&
        postsLimit &&
        postsLimit.posts.length === 0 && (
          <div className="mb-0 h-60 md:my-12 md:h-64 lg:h-60 xl:h-72">
            <Alert>
              <RocketIcon className="w-4 h-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                There are no posts yet. Please come back later.
              </AlertDescription>
            </Alert>
          </div>
        )}
    </>
  );
};

export default PostsLimit;
