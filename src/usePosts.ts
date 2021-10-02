import { useEffect, useState } from "react";
import { Post } from "./PostCard";
import { useStore } from "./store/zstore";

export const usePosts = (): Array<Post> => {
  const [posts, setPosts] = useState<Array<Post>>([]);

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
