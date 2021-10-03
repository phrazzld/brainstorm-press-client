import { useEffect, useState } from "react";
import { useStore } from "./store/zstore";
import { useLndToken } from "./useLndToken";

export type NodeInfo = {
  alias: string;
  balance: number;
  pubkey: string;
};

export const useNodeInfo = (): NodeInfo | null => {
  const [nodeInfo, setNodeInfo] = useState<NodeInfo | null>(null);

  const user = useStore((state) => state.user);
  const lndToken = useLndToken(user);

  useEffect(() => {
    if (lndToken) {
      fetch(`/api/node/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${lndToken}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setNodeInfo(json);
        });
    }
  }, [lndToken]);

  return nodeInfo;
};
