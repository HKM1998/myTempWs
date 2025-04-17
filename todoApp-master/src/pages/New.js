import Header from "../component/Header";
import Editor from "../component/Editor";
import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import { setPageTitle } from "../util";

/**
 * 새 일기 작성 화면 컴포넌트
 * @returns {Component}
 */
const New = () => {
  const navigate = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);

  // 페이지 타이틀 설정
  useEffect(() => {
    setPageTitle("새 일기 쓰기");
  }, []);

  /**
   * 뒤로가기 버튼 클릭 이벤트 핸들러
   */
  const goBack = () => {
    navigate(-1);
  };
  /**
   * Submit 이벤트 핸들러
   * @param {object} data
   */
  const onSubmit = (data) => {
    const { date, content, emotionId } = data;
    onCreate(date, content, emotionId);
    navigate("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
