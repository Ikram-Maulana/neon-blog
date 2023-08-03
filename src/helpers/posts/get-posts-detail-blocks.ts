/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getPostsDetailBlocks = (id: string) => {
  return useQuery({
    queryKey: ["posts-detail-blocks", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/posts/${id}`, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return data.data;
    },
  });
};
