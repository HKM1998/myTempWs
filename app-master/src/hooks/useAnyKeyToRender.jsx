import { useEffect, useState } from "react";

/**
 * 컴포넌트가 랜더링 된후 unmount 될때까지 keydown 이벤트 감지
 * 리렌더링 시킴
 */
const useAnyKeyToRender = () => {
  const [, forceRender] = useState();

  useEffect(() => {
    window.addEventListener("keydown", forceRender);
    return () => window.removeEventListener("keydown", forceRender);
  }, []);
};

export default useAnyKeyToRender;
