import { useEffect } from "react";
import { regenerateAccessToken } from "./api";
import { useStore } from "./store/zstore";

export const useAccessToken = (): string => {
  const accessToken = useStore((state) => state.accessToken);
  const setAccessToken = useStore((state) => state.setAccessToken);

  useEffect(() => {
    if (!accessToken) {
      regenerateAccessToken().then((res) => setAccessToken(res));
    }
  }, [accessToken]);

  return accessToken;
};
