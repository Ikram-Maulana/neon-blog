"use client";

import PostCard from "@/components/post-card";
import { getPosts } from "@/helpers/posts/get-posts";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React, { useEffect, useRef } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import PostCardSkeleton from "./post-card-skeleton";

const Posts = () => {
  const {
    data: posts,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = getPosts();

  const ref = useRef<HTMLDivElement | null>(null);

  const loadMoreEntry = useIntersectionObserver(ref, {});

  useEffect(() => {
    if (loadMoreEntry?.isIntersecting) {
      fetchNextPage();
    }
  }, [loadMoreEntry, fetchNextPage]);

  return (
    <>
      {isLoading && (
        <div className="grid grid-cols-1 gap-6 mb-6 md:my-12 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <PostCardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
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

      {!isLoading && posts && (
        <div className="grid grid-cols-1 gap-6 mb-6 md:my-12 md:grid-cols-2 lg:grid-cols-3">
          {posts?.pages.map((post: any, pageIndex: number) => (
            <React.Fragment key={`posts-${pageIndex}`}>
              {post.posts.map((p: any) => (
                <PostCard key={p.id} {...p} />
              ))}
            </React.Fragment>
          ))}
        </div>
      )}

      <div ref={ref} style={{ height: "1px" }}>
        {!isLoading && !isError && isFetchingNextPage && (
          <p className="mb-6 text-center md:mb-12">Loading...</p>
        )}
      </div>
    </>
  );
};

export default Posts;
