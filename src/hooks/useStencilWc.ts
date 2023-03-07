import { WebContainer } from "@webcontainer/api";
import { useContext, useEffect, useRef, useState } from "react";
import { WcContext } from "../context/WcContext";
import { createStencilContainer } from "../lib/stencil-container";

/**
 * Hook for creating a WC at the top-level
 *
 */
export function useCreateStencilWc() {
  const [wc, setWc] = useState<WebContainer | null>(null);

  const mutexey = useRef(false);

  useEffect(() => {
    if (mutexey.current === true) {
      // this is to prevent this effect from running twice
      // the WC runtime will throw an error if it does
      return;
    }
    mutexey.current = true;

    createStencilContainer().then(setWc);
  }, []);

  return wc;
}

/**
 * An 'accessor' hook which pulls the WC out of the context
 *
 * We throw if we don't find it in order to get better typing
 *
 */
export function useStencilWc(): WebContainer {
  const wc = useContext(WcContext);

  if (wc === null) {
    // we ensure when the value is set into the `WcContext`
    // that it is not null, so this should never happen in practice
    throw "Hey no WC!";
  }

  return wc;
}
