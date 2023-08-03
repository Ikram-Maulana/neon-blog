/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getPostsDetailBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["posts-detail", slug],
    queryFn: async () => {
      const { data } = await axios.get(`/api/posts/detail/${slug}`, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return data.data;
    },
  });
};
