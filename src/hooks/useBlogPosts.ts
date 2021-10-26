import { useEffect, useState } from "react";
import { getUserPosts } from "../utils/api";
import { PaginatedPosts, PaginatedResponse } from "../utils/types";

export const useBlogPosts = (
  username: string,
  page: number,
  free?: boolean,
  search?: string
): PaginatedPosts => {
  const [posts, setPosts] = useState<PaginatedPosts>({
    posts: [],
    totalPages: 0,
  });

  useEffect(() => {
    if (username) {
      getUserPosts(
        username,
        page,
        free,
        search
      ).then((res: PaginatedResponse) =>
        setPosts({ posts: res.docs, totalPages: res.totalPages })
      );
    }
  }, [username, page, free, search]);

  return posts;
};
