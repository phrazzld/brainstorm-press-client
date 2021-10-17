import { useEffect, useState } from "react";
import { getNodeInfo } from "../utils/api";
import { NodeInfo } from "../utils/types";

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
