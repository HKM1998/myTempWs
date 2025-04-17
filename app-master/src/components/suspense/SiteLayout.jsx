/**
 * 메뉴와 자식 노드를 site-container 클래스 내에 배치하는 컴포넌트
 * @param {{children : ChildNode, menu : Component}} param0
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
