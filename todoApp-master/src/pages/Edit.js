import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Header from "../component/Header";
import Editor from "../component/Editor";
import Button from "../component/Button";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import { setPageTitle } from "../util";

/**
 * 수정화면 컴포넌트
 * @returns {Component}
 */
const Edit = () => {
  const { id } = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);

  // 페이지 타이틀 수정
  useEffect(() => {
    setPageTitle(`${id}번 일기 수정하기`);
  }, []);

  /**
   * 뒤로가기 버튼 이벤트 핸들러
   */
  const goBack = () => {
    navigate(-1);
  };
  /**
   * 삭제버튼 클릭 이벤트 핸들러
   */
  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      onDelete(id);
      navigate("/", { replace: true }); // 루트 경로로 이동 후 새로고침
    }
  };
  /**
   * Submit 이벤트 핸들러
   * @param {object} data - 감정일기 데이터
   */
  const onSubmit = (data) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      const { date, content, emotionId } = data;
      onUpdate(id, date, content, emotionId);
      navigate("/", { replace: true });
    }
  };

  if (!data) {
    return <div>일기를 불러오고 있습니다...</div>;
  } else {
    return (
      <div>
        <Header
          title={"새 일기 쓰기"}
          leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
          rightChild={
            <Button
              type={"nagative"}
              text={"삭제하기"}
              onClick={onClickDelete}
            />
          }
        />
        <Editor initData={data} onSubmit={onSubmit} />
      </div>
    );
  }
};

export default Edit;
