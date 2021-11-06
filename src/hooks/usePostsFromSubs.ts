import { useEffect, useState } from "react";
import { rtaGetPostsFromSubs } from "../utils/api";
import { PaginatedPosts, PaginatedResponse } from "../utils/types";
import { useAccessToken } from "./useAccessToken";

export const usePostsFromSubs = (page: number): PaginatedPosts => {
  const [posts, setPosts] = useState<PaginatedPosts>({
    posts: [],
    totalPages: 0,
  });
  const accessToken = useAccessToken();

  useEffect(() => {
    if (accessToken) {
      rtaGetPostsFromSubs(page, accessToken).then((res: PaginatedResponse) =>
        setPosts({ posts: res.docs, totalPages: res.totalPages })
      );
    }
  }, [page, accessToken]);

  return posts;
};
