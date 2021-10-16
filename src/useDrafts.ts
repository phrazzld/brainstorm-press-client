import {useEffect, useState} from "react";
import {rtaGetDrafts} from "./api";
import {Post} from "./types";
import {useAccessToken} from './useAccessToken';

export const useDrafts = (): Array<Post> => {
  const [drafts, setDrafts] = useState<Array<Post>>([]);
  const accessToken = useAccessToken()

  useEffect(() => {
    if (accessToken) {
      rtaGetDrafts(accessToken).then((res) => setDrafts(res));
    }
  }, [accessToken]);

  return drafts;
};
