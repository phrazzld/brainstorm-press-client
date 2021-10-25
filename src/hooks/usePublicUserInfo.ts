import { useEffect, useState } from "react";
import { rtaGetUser } from "../utils/api";
import { User } from "../utils/types";
import { useAccessToken } from "./useAccessToken";

export const usePublicUserInfo = (userId: string): User | null => {
  const [publicUser, setPublicUser] = useState<User | null>(null);

  const accessToken = useAccessToken();

  useEffect(() => {
    if (userId) {
      rtaGetUser(userId, accessToken).then((res) => setPublicUser(res));
    }
  }, [accessToken, userId]);

  return publicUser;
};
