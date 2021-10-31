import { useStore } from "../store/zstore";
import { useEffect, useState } from "react";
import { rtaGetDrafts } from "../utils/api";
import { PaginatedPosts, PaginatedResponse } from "../utils/types";
import { useAccessToken } from "./useAccessToken";

export const useDrafts = (page: number): PaginatedPosts => {
  const [drafts, setDrafts] = useState<PaginatedPosts>({
    posts: [],
    totalPages: 0,
  });
  const user = useStore((state) => state.user);
  const accessToken = useAccessToken();

  useEffect(() => {
    if (accessToken && user) {
      rtaGetDrafts(
        user.username,
        page,
        accessToken
      ).then((res: PaginatedResponse) =>
        setDrafts({ posts: res.docs, totalPages: res.totalPages })
      );
    }
  }, [page, accessToken, user]);

  return drafts;
};
