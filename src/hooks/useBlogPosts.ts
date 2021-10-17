import { useEffect, useState } from "react";
import { getUserPosts } from "../utils/api";
import { Post } from "../utils/types";

export const useBlogPosts = (userId: string): Array<Post> => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    if (userId) {
      getUserPosts(userId).then((res) => setPosts(res));
    }
  }, [userId]);

  return posts;
};
