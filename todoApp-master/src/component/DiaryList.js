import "./DiaryList.css";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

/**
 * 정렬 기준 리스트
 */
const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

/**
 * 일기 리스트 컴포넌트
 * @param {{data:object}} param0
 * @returns {Component}
 */
const DiaryList = ({ data }) => {
  const [sortType, setSortType] = useState("latest");
  const [sortedData, setSortedData] = useState([]);
  const navigate = useNavigate();

  // 데이터나 정렬기준이 변경되면 리랜더링
  useEffect(() => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return Number(b.date) - Number(a.date);
      } else {
        return Number(a.date) - Number(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(data));
    copyList.sort(compare);
    setSortedData(copyList);
  }, [data, sortType]);

  /**
   * 정렬기준 변경 이벤트 핸들러
   * @param {EventHandler} e
   */
  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };
  /**
   * 새 일기 쓰기 버튼 클릭 이벤트 핸들러
   */
  const onClickNew = () => {
    navigate("/new");
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <select onChange={onChangeSortType}>
            {sortOptionList.map((it, idx) => (
              <option key={idx} value={it.value}>
                {it.name}
              </option>
            ))}
          </select>
        </div>
        <div className="right_col">
          <Button
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={onClickNew}
          />
        </div>
      </div>
      <div className="list_wrapper">
        {sortedData.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
