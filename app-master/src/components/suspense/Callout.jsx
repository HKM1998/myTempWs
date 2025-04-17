import ClassErrorBoundary from "./ClassErrorBoundary";
import SimpleErrorScreen from "./SimpleErrorScreen";

/**
 * 자식요소를 ClassErrorBoundary내에 배치하는 컴포넌트
 * fallback 이 설정된 컴포넌트
 * 에러가 발생하면 SimpleErrorScreen 컴포넌트를 보여준다
 * @param {{children : ChildNode}} param0
 * @returns
 */
const Callout = ({ children }) => (
  <ClassErrorBoundary fallback={SimpleErrorScreen}>
    <div className="callout">{children}</div>
  </ClassErrorBoundary>
);

export default Callout;
