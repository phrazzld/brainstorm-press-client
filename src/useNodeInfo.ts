import { useEffect, useState } from "react";
import { getNodeInfo } from "./api";

export type NodeInfo = {
  alias: string;
  balance: number;
  pubkey: string;
};

export const useNodeInfo = (lndToken: string): NodeInfo | null => {
  const [nodeInfo, setNodeInfo] = useState<NodeInfo | null>(null);

  useEffect(() => {
    if (lndToken) {
      getNodeInfo(lndToken).then((res) => setNodeInfo(res));
    } else {
      setNodeInfo(null);
    }
  }, [lndToken]);

  return nodeInfo;
};
