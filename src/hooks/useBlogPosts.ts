import { useEffect, useState } from "react";
import { getUserPosts } from "../utils/api";
import { PaginatedPosts, PaginatedResponse } from "../utils/types";

export const useBlogPosts = (
  userId: string,
  page: number,
  free?: boolean,
  search?: string
): PaginatedPosts => {
  const [posts, setPosts] = useState<PaginatedPosts>({
    posts: [],
    totalPages: 0,
  });

  useEffect(() => {
    if (userId) {
      getUserPosts(userId, page, free, search).then((res: PaginatedResponse) =>
        setPosts({ posts: res.docs, totalPages: res.totalPages })
      );
    }
  }, [userId, page, free, search]);

  return posts;
};
