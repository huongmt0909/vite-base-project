import * as React from "react";
import { UNSAFE_NavigationContext } from "react-router-dom";
import type { History } from "history";

export function useBlocker(blocker: any, when = true) {
  const navigator = React.useContext(UNSAFE_NavigationContext).navigator as History;

  React.useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx: any) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}

export default function usePrompt(when = true, message = "変更した内容が保存されない場合があります。") {
  const blocker = React.useCallback(
    (tx: any) => {
      const query = new URLSearchParams(location.search);
      const preview = query.get("preview");
      if (preview) return null;

      if (window.confirm(message)) tx.retry();
    },
    [message],
  );

  useBlocker(blocker, when);
}
