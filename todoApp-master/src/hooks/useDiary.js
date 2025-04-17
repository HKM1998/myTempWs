import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

/**
 * id 와 매칭되는 감정일기 데이터 조회 훅
 * @param {number} id
 * @returns {object} 입력 id 와 매칭되는 감정일기 객체
 */
const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [diary, setDiary] = useState();
  const navigate = useNavigate();

  // DiaryStateContext 에서 인자로 받아온 id 값과 매칭되는 데이터 조회 후 리턴
  useEffect(() => {
    const matchDiary = data.find((it) => String(it.id) === String(id));
    if (matchDiary) {
      setDiary(matchDiary);
    } else {
      alert("일기가 존재하지 않습니다.");
      navigate("/", { replace: true });
    }
  }, [id, data]);

  return diary;
};

export default useDiary;
