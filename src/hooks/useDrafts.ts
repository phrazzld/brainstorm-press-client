import { useEffect, useState } from "react";
import { rtaGetDrafts } from "../utils/api";
import { Post } from "../utils/types";
import { useAccessToken } from "./useAccessToken";

export const useDrafts = (): Array<Post> => {
  const [drafts, setDrafts] = useState<Array<Post>>([]);
  const accessToken = useAccessToken();

  useEffect(() => {
    if (accessToken) {
      rtaGetDrafts(accessToken).then((res) => setDrafts(res));
    }
  }, [accessToken]);

  return drafts;
};
