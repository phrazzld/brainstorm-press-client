import { useEffect, useState } from "react";
import { getPosts } from "../utils/api";
import { PaginatedPosts, PaginatedResponse } from "../utils/types";

export const usePosts = (page: number): PaginatedPosts => {
  const [paginatedPosts, setPaginatedPosts] = useState<PaginatedPosts>({
    posts: [],
    totalPages: 0,
  });

  useEffect(() => {
    getPosts(page).then((res: PaginatedResponse) => {
      setPaginatedPosts({
        posts: res.docs,
        totalPages: res.totalPages,
      });
    });
  }, [page]);

  return paginatedPosts;
};
