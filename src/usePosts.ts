import { useEffect, useState } from "react";
import { getPosts } from "./api";
import { Post } from "./PostCard";

export const usePosts = (): Array<Post> => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    getPosts().then((res) => setPosts(res));
  }, []);

  return posts;
};
