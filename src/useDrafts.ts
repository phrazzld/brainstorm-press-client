import { useEffect, useState } from "react";
import { rtaGetDrafts } from "./api";
import { useStore } from "./store/zstore";
import { Post } from "./types";

export const useDrafts = (): Array<Post> => {
  const [drafts, setDrafts] = useState<Array<Post>>([]);
  const accessToken = useStore((state) => state.accessToken);

  useEffect(() => {
    if (accessToken) {
      rtaGetDrafts(accessToken).then((res) => setDrafts(res));
    }
  }, [accessToken]);

  return drafts;
};
