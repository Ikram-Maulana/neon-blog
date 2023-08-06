/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getPostHighlight = () => {
  return useQuery({
    queryKey: ["post", "highlight"],
    queryFn: async () => {
      const { data } = await axios.get("/api/posts?_limit=1&_highlight=true", {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return data.data;
    },
  });
};
