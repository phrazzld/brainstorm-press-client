import { useEffect, useState } from "react";
import { getPosts } from "../utils/api";
import { Post } from "../utils/types";

export const usePosts = (): Array<Post> => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    getPosts().then((res) => setPosts(res));
  }, []);

  return posts;
};
