import ClassErrorBoundary from "./ClassErrorBoundary";
import SimpleErrorScreen from "./SimpleErrorScreen";

const Menu = () => (
  <ClassErrorBoundary fallback={SimpleErrorScreen}>
    <p style={{ color: "white" }}>TODO : Build Menu</p>
  </ClassErrorBoundary>
);

export default Menu;
