import { useEffect, useState } from "react";
import { Post } from "./PostCard";

export const usePosts = (): Array<Post> => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    fetch("/api/posts", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPosts(json);
      });
  }, []);

  return posts;
};
