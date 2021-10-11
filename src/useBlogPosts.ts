import { useEffect, useState } from "react";
import { getUserPosts } from "./api";
import { Post } from "./types";

export const useBlogPosts = (userId: string): Array<Post> => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    if (userId) {
      getUserPosts(userId).then((res) => setPosts(res));
    }
  }, [userId]);

  return posts;
};
