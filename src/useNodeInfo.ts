import { useEffect, useState } from "react";
import { useStore } from "./store/zstore";

export type NodeInfo = {
  alias: string;
  balance: number;
  pubkey: string;
};

export const useNodeInfo = (): NodeInfo | null => {
  const [nodeInfo, setNodeInfo] = useState<NodeInfo | null>(null);

  const lndToken: string = useStore((state) => state.lndToken);

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
