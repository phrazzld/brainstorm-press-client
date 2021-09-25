import { useEffect, useState } from "react";
import { TPost } from "./Post";
import { useStore } from "./store/zstore";

export const usePosts = (): Array<TPost> => {
  const [posts, setPosts] = useState<Array<TPost>>([]);

  const jwt: string = useStore((state) => state.jwt);

  useEffect(() => {
    fetch("/api/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPosts(json);
      });
  }, [jwt]);

  return posts;
};
