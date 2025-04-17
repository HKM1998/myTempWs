import "./EmotionItem.css";
import React from "react";

/**
 * 감정 아이템 컴포넌트
 * @param {object} obj - 감정 아이템 정보
 * @param {number} obj.id - 감정 id
 * @param {ImageData} obj.img - 감정 이미지
 * @param {string} obj.name - 감정 이름
 * @param {EventHandler} obj.onClick - 감정 클릭 이벤트 핸들러
 * @param {boolean} obj.isSelected - 감정 선택 여부
 * @returns {Component}
 */
const EmotionItem = ({ id, img, name, onClick, isSelected }) => {
  /**
   * 클릭 이벤트 핸들러
   */
  const handleOnClick = () => {
    onClick(id);
  };

  return (
    <div
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${id}` : `Emotion_off`,
      ].join(" ")}
      onClick={handleOnClick}
    >
      <img src={img} alt={`emotion${id}`} />
      <span>{name}</span>
    </div>
  );
};

// 한번 랜더링 하면 수정될 이유가 없기 때문에 메모이제이션
export default React.memo(EmotionItem);
