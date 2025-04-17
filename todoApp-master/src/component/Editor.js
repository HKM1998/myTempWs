import "./Editor.css";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList, getFormattedDate } from "../util";
import Button from "./Button";
import EmotionItem from "./EmotionItem";

/**
 * 수정 페이지 컴포넌트
 * @param {object} obj
 * @param {object} obj.initData - 기존 데이터
 * @param {EventHandler} obj.onSubmit - 수정완료 이벤트 핸들러
 * @returns {Component} 수정페이지 컴포넌트
 */
const Editor = ({ initData, onSubmit }) => {
  const navigate = useNavigate();
  // initData 최초 설정시 state에 반영
  useEffect(() => {
    if (initData) {
      setState({
        ...initData,
        date: getFormattedDate(new Date(parseInt(initData.date))),
      });
    }
  }, [initData]);

  // 초기값 설정
  const [state, setState] = useState({
    date: getFormattedDate(new Date()),
    emotionId: 3,
    content: "",
  });

  /**
   * 날짜 변경 이벤트 핸들러
   * @param {Event} e
   */
  const handleChangeDate = (e) => {
    setState({
      ...state,
      date: e.target.value,
    });
  };
  /**
   * 감정 변경 이벤트 핸들러
   */
  const handleChangeEmotion = useCallback((emotionId) => {
    setState((state) => ({
      ...state,
      emotionId,
    }));
  }, []);
  /**
   * 내용 변경 이벤트 핸들러
   * @param {Event} e
   */
  const handleChangeContent = (e) => {
    setState({
      ...state,
      content: e.target.value,
    });
  };
  /**
   * 작성완료 버튼 클릭 이벤트 핸들러
   */
  const handleSubmit = () => {
    onSubmit(state);
  };
  /**
   * 뒤로가기 버튼 이벤트 핸들러
   */
  const handleOnGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="Editor">
      <div className="editor_section">
        <h4>오늘의 날짜</h4>
        <div className="input_wrapper">
          <input type="date" value={state.date} onChange={handleChangeDate} />
        </div>
      </div>
      <div className="editor_section">
        <h4>오늘의 감정</h4>
        <div className="input_wrapper emotion_list_wrapper">
          {emotionList.map((it) => (
            <EmotionItem
              key={it.id}
              {...it}
              onClick={handleChangeEmotion}
              isSelected={state.emotionId === it.id}
            />
          ))}
        </div>
      </div>
      <div className="editor_section">
        <h4>오늘의 일기</h4>
        <div className="input_wrapper">
          <textarea
            placeholder="오늘은 어땠나요?"
            value={state.content}
            onChange={handleChangeContent}
          />
        </div>
      </div>
      <div className="editor_section bottom_section">
        <Button text={"취소하기"} onClick={handleOnGoBack} />
        <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Editor;
