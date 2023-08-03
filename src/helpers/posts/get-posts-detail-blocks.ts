/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getPostsDetailBlocks = (slug: string, id: string) => {
  return useQuery({
    queryKey: ["posts-detail", slug, "blocks", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/posts/detail/${slug}/blocks/${id}`,
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
      return data.data;
    },
  });
};
