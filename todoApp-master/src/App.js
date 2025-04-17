import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import React, { useEffect, useReducer, useRef, useState } from "react";

/* 
 context 를 따로 만드는 이유는 상태가 변경될때
 함수와 연관관계에 있는 컴포넌트는 리랜더링 할필요가 없으므로
 상태/함수를 따로 두어 각자 context를 사용하도록 함
*/
/** State만 담는 Context */
export const DiaryStateContext = React.createContext();
/** Dispatch(함수 등)만 담는 Context */
export const DiaryDispatchContext = React.createContext();

/**
 * useReducer 에 사용할 reducer
 * 각 액션 type 별로 처리
 * @param {Array} state
 * @param {{}} action
 * @returns {object[]} 데이터를 담고 있는 객체 배열
 */
function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      // 초기 설정 액션에서 넣는 data 그대로 반환
      return action.data;
    case "CREATE": {
      // 신규 데이터 삽입 및 로컬스토리지 저장
      const newState = [action.data, ...state];
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "UPDATE": {
      // 특정 id 값 데이터 수정
      const newState = state.map((it) =>
        String(it.id) === String(action.data.id) ? { ...action.data } : it
      );
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }

    case "DELETE": {
      // 특정 id 값 삭제
      const newState = state.filter(
        (it) => String(it.id) !== String(action.targetId)
      );
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
}

// const mockData = [
//   {
//     id: "mock1",
//     date: new Date().getTime() - 1,
//     content: "mock1",
//     emotionId: 1,
//   },
//   {
//     id: "mock2",
//     date: new Date().getTime() - 2,
//     content: "mock2",
//     emotionId: 2,
//   },
//   {
//     id: "mock3",
//     date: new Date().getTime() - 3,
//     content: "mock3",
//     emotionId: 3,
//   },
// ];

function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  // 최조 실행시 초깃값 설정 및 데이터 불러오기
  useEffect(() => {
    // 로컬스토리지 데이터 사용
    const rawData = localStorage.getItem("diary");
    if (!rawData) {
      setIsDataLoaded(true);
      return;
    }
    const localData = JSON.parse(rawData);
    if (localData.length === 0) {
      setIsDataLoaded(true);
      return;
    }
    // id 기준 오름차순 정렬
    localData.sort((a, b) => Number(b.id) - Number(a.id));
    idRef.current = localData[0].id + 1;
    dispatch({ type: "INIT", data: localData });
    setIsDataLoaded(true);
  }, []);

  /**
   * 데이터 추가 함수
   * @param {Date} date
   * @param {string} content
   * @param {number} emotionId
   */
  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
    idRef.current += 1;
  };
  /**
   * 데이터 수정 함수 - targetId 매칭 데이터 수정
   * @param {number} targetId
   * @param {Date} date
   * @param {string} content
   * @param {number} emotionId
   */
  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
  };
  /**
   * 데이터 삭제 함수 - targetId 매칭 데이터 삭제
   * @param {number} targetId
   */
  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다.</div>;
  } else {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/new" element={<New />}></Route>
              <Route path="/diary/:id" element={<Diary />}></Route>
              <Route path="/edit/:id" element={<Edit />}></Route>
            </Routes>
          </div>
        </DiaryDispatchContext>
      </DiaryStateContext.Provider>
    );
  }
}

export default App;
