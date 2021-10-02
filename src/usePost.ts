import { useEffect, useState } from "react";
import { TPost } from "./PostCard";
import { useStore } from "./store/zstore";

export const usePost = (postId: string): TPost | null => {
  const [post, setPost] = useState<TPost | null>(null);

  const user = useStore((state) => state.user)

  useEffect(() => {
    if (user) {
      fetch(`/api/posts/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPost(json);
      });
    }
  }, [user, postId]);

  return post;
};
