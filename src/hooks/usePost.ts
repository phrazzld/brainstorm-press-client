import { useEffect, useState } from "react";
import { rtaGetPost } from "../utils/api";
import { Post } from "../utils/types";
import { useAccessToken } from "./useAccessToken";

export const usePost = (postId: string): Post | null => {
  const [post, setPost] = useState<Post | null>(null);

  const accessToken = useAccessToken();

  useEffect(() => {
    if (postId) {
      rtaGetPost(postId, accessToken).then((res) => setPost(res));
    }
  }, [accessToken, postId]);

  return post;
};
