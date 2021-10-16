import { useEffect, useState } from "react";
import { rtaGetPost } from "./api";
import { Post } from "./types";
import { useAccessToken } from "./useAccessToken";

export const usePost = (postId: string): Post | null => {
  const [post, setPost] = useState<Post | null>(null);

  const accessToken = useAccessToken();

  useEffect(() => {
    if (postId && accessToken) {
      rtaGetPost(postId, accessToken).then((res) => setPost(res));
    }
  }, [accessToken, postId]);

  return post;
};
