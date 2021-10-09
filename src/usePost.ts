import { useEffect, useState } from "react";
import { Post } from "./PostCard";
import { useStore } from "./store/zstore";

export const usePost = (postId: string): Post | null => {
  const [post, setPost] = useState<Post | null>(null);

  const accessToken = useStore((state) => state.accessToken);

  useEffect(() => {
    fetch(`/api/posts/${postId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPost(json);
      });
  }, [accessToken, postId]);

  return post;
};
