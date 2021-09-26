import {useEffect, useState} from "react";
import {TPost} from "./PostCard";
import {useStore} from "./store/zstore";

export const usePost = (postId: string): TPost | null => {
  const [post, setPost] = useState<TPost | null>(null);

  const jwt: string = useStore((state) => state.jwt);

  useEffect(() => {
    fetch(`/api/posts/${postId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPost(json);
      });
  }, [jwt, postId]);

  return post;
};
