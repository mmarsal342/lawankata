import { useEffect, useState } from "react";

export function useVisualViewport() {
  const [vh, setVh] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 800,
  );

  useEffect(() => {
    const update = () => {
      const vv = window.visualViewport;
      setVh(vv ? vv.height : window.innerHeight);
    };
    update();
    const vv = window.visualViewport;
    vv?.addEventListener("resize", update);
    vv?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      vv?.removeEventListener("resize", update);
      vv?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return vh;
}
