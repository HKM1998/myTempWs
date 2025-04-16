/**
 *
 * @param {{children : Component, menu : Component}} param0
 * @returns
 */
const SiteLayout = ({ children, menu = () => null }) => {
  return (
    <div className="site-container">
      <div>{menu}</div>
      <div>{children}</div>
    </div>
  );
};

export default SiteLayout;
