import { useEffect, useState } from "react";
import { Post } from "./PostCard";

export const useBlogPosts = (userId: string): Array<Post> => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    fetch(`/api/users/${userId}/posts`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => setPosts(json));
  }, [userId]);

  return posts;
};
