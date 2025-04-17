import ClassErrorBoundary from "./ClassErrorBoundary";
import SimpleErrorScreen from "./SimpleErrorScreen";

/**
 * 메인 메뉴 명을 보여주는 컴포넌트
 * fallback 이 설정된 컴포넌트
 * 에러가 발생하면 SimpleErrorScreen 컴포넌트를 보여준다
 * @returns
 */
const Menu = () => (
  <ClassErrorBoundary fallback={SimpleErrorScreen}>
    <p style={{ color: "white" }}>TODO : Build Menu</p>
  </ClassErrorBoundary>
);

export default Menu;
