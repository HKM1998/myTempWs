import { useNavigate } from "react-router-dom";
import React from "react";
import "./DiaryItem.css";
import { getEmotionImgById } from "../util";
import Button from "./Button";

/**
 * 감정일기 리스트 아이템 컴포넌트
 * @param {object} obj - 감정일기 데이터
 * @param {number} obj.id - 아이디
 * @param {number} obj.emotionId - 감정 id 1~5
 * @param {string} obj.content - 일기 내용
 * @param {Date} obj.date - 날짜
 * @returns {Component} 리스트아이템 컴포넌트
 */
const DiaryItem = ({ id, emotionId, content, date }) => {
  const navigate = useNavigate();
  /**
   * 상세 화면 이동 함수
   */
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };
  /**
   * 수정 화면 이동 함수
   */
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={["img_section", `img_section_${emotionId}`].join(" ")}
      >
        <img src={getEmotionImgById(emotionId)} alt={`emotion${emotionId}`} />
      </div>
      <div onClick={goDetail} className="info_section">
        <div className="date_wrapper">
          {new Date(parseInt(date)).toLocaleDateString()}
        </div>
        <div className="content_wrapper">{content.slice(0, 25)}</div>
      </div>
      <div className="button_section">
        <Button onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
