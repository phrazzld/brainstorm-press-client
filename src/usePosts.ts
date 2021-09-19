import { useEffect, useState } from "react";
import { TPost } from "./Post";

export const usePosts = (): Array<TPost> => {
  const [posts, setPosts] = useState<Array<TPost>>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((json) => setPosts(json.data));
  }, []);

  return posts;
};
