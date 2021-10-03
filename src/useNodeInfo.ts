import { useEffect, useState } from "react";
import { useStore } from "./store/zstore";
import { useLndToken } from "./useLndToken";

export type NodeInfo = {
  alias: string;
  balance: number;
  pubkey: string;
};

export const useNodeInfo = (lndToken: string): NodeInfo | null => {
  const [nodeInfo, setNodeInfo] = useState<NodeInfo | null>(null);

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
    } else {
      setNodeInfo(null)
    }
  }, [lndToken]);

  return nodeInfo;
};
