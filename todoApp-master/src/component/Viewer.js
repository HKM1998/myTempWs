import "./Viewer.css";
import { emotionList } from "../util";

/**
 * 감정 일기 상세 페이지 컴포넌트
 * @param {object} obj - 감정일기 데이터
 * @param {string} obj.content - 감정일기 내용
 * @param {number} obj.emotionId - 감정 ID
 * @returns {Component} 감정일기 상세 컴포넌트
 */
const Viewer = ({ content, emotionId }) => {
  const emotionItem = emotionList.find((it) => it.id === emotionId);

  return (
    <div className="Viewer">
      <section>
        <h4>오늘의 감정</h4>
        <div
          className={[
            "emotion_img_wrapper",
            `emotion_img_wrapper_${emotionId}`,
          ].join(" ")}
        >
          <img src={emotionItem.img} alt={emotionItem.name} />
          <div className="emotion_descript">{emotionItem.name}</div>
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
