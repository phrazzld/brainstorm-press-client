import { useEffect, useState } from "react";
import { rtaGetDrafts } from "../utils/api";
import { PaginatedPosts, PaginatedResponse } from "../utils/types";
import { useAccessToken } from "./useAccessToken";

export const useDrafts = (page: number): PaginatedPosts => {
  const [drafts, setDrafts] = useState<PaginatedPosts>({
    posts: [],
    totalPages: 0,
  });
  const accessToken = useAccessToken();

  useEffect(() => {
    if (accessToken) {
      rtaGetDrafts(page, accessToken).then((res: PaginatedResponse) =>
        setDrafts({ posts: res.docs, totalPages: res.totalPages })
      );
    }
  }, [page, accessToken]);

  return drafts;
};
