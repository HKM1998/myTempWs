import "./Button.css";

/**
 * 버튼 컴포넌트
 * @param {Object} obj - 버튼 설정값
 * @param {string} obj.text - 내용
 * @param {string} obj.type - 타입 positive: 긍정, negative: 부정, default: 그외
 * @param {EventHandler} obj.onClick - 클릭 이벤트 핸들러
 * @returns {Component} 버튼 컴포넌트
 */
const Button = ({ text, type = "default", onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    <button
      className={["Button", `Button_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
