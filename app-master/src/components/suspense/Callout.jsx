import ClassErrorBoundary from "./ClassErrorBoundary";
import SimpleErrorScreen from "./SimpleErrorScreen";

const Callout = ({ children }) => (
  <ClassErrorBoundary fallback={SimpleErrorScreen}>
    <div className="callout">{children}</div>
  </ClassErrorBoundary>
);

export default Callout;
