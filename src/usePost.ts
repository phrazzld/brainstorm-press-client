import { useEffect, useState } from "react";
import { rtaGetPost } from "./api";
import { Post } from "./PostCard";
import { useStore } from "./store/zstore";

export const usePost = (postId: string): Post | null => {
  const [post, setPost] = useState<Post | null>(null);

  const accessToken = useStore((state) => state.accessToken);

  useEffect(() => {
    if (postId && accessToken) {
      rtaGetPost(postId, accessToken).then((res) => setPost(res));
    }
  }, [accessToken, postId]);

  return post;
};
