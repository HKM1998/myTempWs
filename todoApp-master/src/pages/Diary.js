import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import { getFormattedDate, setPageTitle } from "../util";
import Header from "../component/Header";
import Button from "../component/Button";
import Viewer from "../component/Viewer";
import { useEffect } from "react";

/**
 * 감정일기 상세 페이지 컴포넌트
 * @returns {Component}
 */
const Diary = () => {
  const { id } = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();

  // 컴포넌트 랜더링 시 타이틀 설정
  useEffect(() => {
    setPageTitle(`${id}번 일기`);
  }, []);

  /**
   * 뒤로가기 버튼 이벤트 핸들러
   */
  const goBack = () => {
    navigate(-1);
  };
  /**
   * 수정하기 버튼 이벤트 핸들러 - 해당 일기 id로 edit 페이지 이동
   */
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (!data) {
    return <div>일기를 불러오고 있습니다.</div>;
  } else {
    const { date, emotionId, content } = data;
    const title = `${getFormattedDate(new Date(Number(date)))} 기록`;
    return (
      <div>
        <Header
          title={title}
          leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
          rightChild={<Button text={"수정하기"} onClick={goEdit} />}
        />
        <Viewer content={content} emotionId={emotionId} />
      </div>
    );
  }
};

export default Diary;
