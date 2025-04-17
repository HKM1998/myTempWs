import "./Header.css";

/**
 * 페이지 헤더 컴포넌트
 * @param {object} obj - 입력 데이터
 * @param {string} obj.title - 제목
 * @param {Component} obj.leftChild - 헤더 좌측 컴포넌트
 * @param {Component} obj.rightChild - 헤더 우측 컴포넌트
 * @returns {Component} 페이지 헤더
 */
const Header = ({ title, leftChild, rightChild }) => {
  return (
    <div className="Header">
      <div className="header_left">{leftChild}</div>
      <div className="header_title">{title}</div>
      <div className="header_right">{rightChild}</div>
    </div>
  );
};

export default Header;
