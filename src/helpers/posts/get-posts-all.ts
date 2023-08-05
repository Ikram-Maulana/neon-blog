/* eslint-disable react-hooks/rules-of-hooks */
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async (page: string) => {
  const { data } = await axios.get(`/api/posts?_page=${page ? page : ""}`, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
  return data.data;
};

export const getPostsAll = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = undefined }) => {
      return await fetchData(pageParam);
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) return undefined;
      return lastPage.nextCursor;
    },
  });
};
