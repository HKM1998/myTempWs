import Callout from "./Callout";
import Menu from "./Menu";
import SiteLayout from "./SiteLayout";
import "../../css/SiteLayout.css";

/**
 * SiteLayout 컴ㅍ포넌트에 메뉴 컴포넌트와 자식요소를 추가하는 컴포넌트
 * @returns
 */
const MainPage = () => {
  return (
    <SiteLayout menu={<Menu />}>
      <Callout>Welcome to the site - Logo top menu</Callout>
      <h1>TODO : Main Page</h1>
      <p>Contents : Session, Article, Image</p>
    </SiteLayout>
  );
};

export default MainPage;
