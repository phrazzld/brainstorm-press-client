import { useEffect, useState } from "react";
import { getNodeInfo } from "../utils/api";
import { NodeInfo } from "../utils/types";

export const useNodeInfo = (lnToken: string): NodeInfo | null => {
  const [nodeInfo, setNodeInfo] = useState<NodeInfo | null>(null);

  useEffect(() => {
    if (lnToken) {
      getNodeInfo(lnToken).then((res) => setNodeInfo(res));
    } else {
      setNodeInfo(null);
    }
  }, [lnToken]);

  return nodeInfo;
};
