"use client";

import { useEffect } from "react";

const useConfirmPageLeave = () => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
      return "작성하던 내용이 모두 사라집니다. 계속하시겠습니까?";
    };

    const handleUnload = () => {
      return "작성하던 내용이 모두 사라집니다. 계속하시겠습니까?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload); // 일부 브라우저에서는 동작하지 않을 수 있습니다.

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);
};

export default useConfirmPageLeave;
