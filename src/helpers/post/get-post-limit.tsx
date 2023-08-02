/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getPostsLimit = () => {
  return useQuery({
    queryKey: ["posts", "limit"],
    queryFn: async () => {
      const { data } = await axios.get("/api/posts?_limit=4", {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return data.data;
    },
  });
};
