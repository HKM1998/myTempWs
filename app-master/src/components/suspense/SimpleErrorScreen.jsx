/**
 * 간단한 에러화면 컴포넌트
 * @param {{error : Error}} param0
 * @returns
 */
function SimpleErrorScreen({ error }) {
  return (
    <div
      style={{
        backgroundColor: "#ffe0e0",
        border: "1px solid red",
        padding: "10px",
      }}
    >
      <h1>죄송합니다.. 오류가 발생했습니다.</h1>
      <p>현재 요청을 처리할 수 없습니다.</p>
      {error && <pre>{error.toString()}</pre>}
    </div>
  );
}

export default SimpleErrorScreen;
