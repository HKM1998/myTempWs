import Callout from "./Callout";
import Menu from "./Menu";
import SiteLayout from "./SiteLayout";
import "../../css/SiteLayout.css";

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
