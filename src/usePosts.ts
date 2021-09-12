import React, { useState, useEffect } from "react";
import { TPost } from "./Post";

export const usePosts = (): Array<TPost> => {
  const [posts, setPosts] = useState<Array<TPost>>([]);

  useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then((json) => setPosts(json.data));
  }, []);

  return posts;
};
