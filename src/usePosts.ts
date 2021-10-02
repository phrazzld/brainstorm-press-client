import { useEffect, useState } from "react";
import { TPost } from "./PostCard";
import { useStore } from "./store/zstore";

export const usePosts = (): Array<TPost> => {
  const [posts, setPosts] = useState<Array<TPost>>([]);

  const user = useStore((state) => state.user)

  useEffect(() => {
    if (user) {
      fetch("/api/posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPosts(json);
      });
    }
  }, [user]);

  return posts;
};
