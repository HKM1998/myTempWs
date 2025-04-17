import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { getMonthRangeByDate, setPageTitle } from "../util";
import Button from "../component/Button";
import Header from "../component/Header";
import DiaryList from "../component/DiaryList";

/**
 * 감정일기장 홈 화면 컴포넌트
 * @returns {Component}
 */
const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);

  // 페이지 타이틀 설정
  useEffect(() => {
    setPageTitle("경민의 감정 일기장");
  }, []);

  // 감정일기데이터 및 조회 기간 변경시 반영 - useEffect 훅
  useEffect(() => {
    // 데이터가 있는 경우만 반영
    if (data.length >= 1) {
      const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
      setFilteredData(
        data.filter(
          (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
        )
      );
    } else {
      setFilteredData([]);
    }
  }, [data, pivotDate]);

  const headerTitle = `${pivotDate.getFullYear()}년 
                        ${pivotDate.getMonth() + 1}월`;

  /**
   * 다음월 함수 - PivotDate Month + 1
   */
  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  /**
   * 이전월 함수 - PivotDate Month - 1
   */
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={headerTitle}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
      ></Header>
      <DiaryList data={filteredData} />
    </div>
  );
};

export default Home;
