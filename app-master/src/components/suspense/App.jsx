import { Suspense, lazy } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

// lazy - 의도적인 시간 지체 함수
const MainPage = lazy(() => import("./MainPage"));

/**
 * Suspense를 사용하여 로딩화면을 fallback 으로 보여주는 예제
 * @returns Suspense 안에서 실행되는 메인페이지 컴포넌트
 */
function App() {
  // fallback : 컴포넌트가 로딩중일때 보여줄 UI
  return (
    <Suspense fallback={<ClimbingBoxLoader />}>
      <MainPage />
    </Suspense>
  );
}

export default App;
