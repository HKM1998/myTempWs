import { useState, useLayoutEffect } from "react";

/**
 * 컴포넌트가 랜더링 된후 unmount 될때까지 mousemove 이벤트 감지
 * 훅이 활성화된 경우 호출한 컴포넌트가 지속적으로 리렌더링
 * @returns [x, y] = 마우스의 x, y 좌표값
 */
const useMousePosition = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const setPosition = ({ x, y }) => {
    setX(x);
    setY(y);
  };

  useLayoutEffect(() => {
    window.addEventListener("mousemove", setPosition);
    return () => window.removeEventListener("mousemove", setPosition);
  }, []);

  return [x, y];
};

export default useMousePosition;
