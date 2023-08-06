/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getPostDetail = (slug: string) => {
  return useQuery({
    queryKey: ["post-detail", slug],
    queryFn: async () => {
      const { data } = await axios.get(`/api/posts/${slug}`, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return data.data;
    },
  });
};
