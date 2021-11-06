import { useEffect, useState } from "react";
import { rtaGetSubs } from "../utils/api";
import { Subscription } from "../utils/types";
import { useAccessToken } from "./useAccessToken";

export const useSubs = (): Array<Subscription> => {
  const [subs, setSubs] = useState<Array<Subscription>>([]);
  const accessToken = useAccessToken();

  useEffect(() => {
    if (accessToken) {
      rtaGetSubs(accessToken).then((res: Array<Subscription>) => setSubs(res));
    }
  }, [accessToken]);

  return subs;
};
