import { useEffect } from "react";
import { User, useStore } from "./store/zstore";

export const useLndToken = (user: User | null): string => {
  const lndToken = useStore((state) => state.lndToken);
  const setLndToken = useStore((state) => state.setLndToken);

  useEffect(() => {
    if (user?.node) {
      fetch("/api/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.jwtToken}`,
        },
        body: JSON.stringify({
          host: user.node.host,
          cert: user.node.cert,
          macaroon: user.node.macaroon,
        }),
      })
        .then((res) => res.json())
        .then((json) => setLndToken(json.token));
    } else {
      setLndToken("")
    }
  }, [user]);

  return lndToken;
};
