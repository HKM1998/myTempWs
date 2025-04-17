import emotion1 from "./img/emotion1.png";
import emotion2 from "./img/emotion2.png";
import emotion3 from "./img/emotion3.png";
import emotion4 from "./img/emotion4.png";
import emotion5 from "./img/emotion5.png";

/**
 * 감정 ID 를 받아 이미지 파일을 반환하는 함수
 * @param {number} emotionId
 * @returns {감정이미지파일}
 */
export const getEmotionImgById = (emotionId) => {
  const targetEmotionId = String(emotionId);
  switch (targetEmotionId) {
    case "1":
      return emotion1;
    case "2":
      return emotion2;
    case "3":
      return emotion3;
    case "4":
      return emotion4;
    case "5":
      return emotion5;
    default:
      return null;
  }
};

/**
 * 날짜 데이터를 받아 포멧이 적용된 문자열로 반환
 * @param {Date} targetDate
 * @returns yyyy-MM-dd 포멧 문자열
 */
export const getFormattedDate = (targetDate) => {
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }
  return `${year}-${month}-${date}`;
};

/**
 * 감정 객체 배열
 */
export const emotionList = [
  {
    id: 1,
    name: "완전 좋음",
    img: getEmotionImgById(1),
  },
  {
    id: 2,
    name: "좋음",
    img: getEmotionImgById(2),
  },
  {
    id: 3,
    name: "그럭저럭",
    img: getEmotionImgById(3),
  },
  {
    id: 4,
    name: "나쁨",
    img: getEmotionImgById(4),
  },
  {
    id: 5,
    name: "끔찍함",
    img: getEmotionImgById(5),
  },
];

/**
 * Date를 받아 해당 월의 시작시점과 종료시점을 number(Date.getTime)로 반환
 * @param {Date} date
 * @returns {{beginTimeStamp: 월시작시점, endTimeStamp : 월종료시점}}
 */
export const getMonthRangeByDate = (date) => {
  const beginTimeStamp = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getTime();
  const endTimeStamp = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return { beginTimeStamp, endTimeStamp };
};

/**
 * title 내용을 수정하는 함수
 * @param {string} title
 */
export const setPageTitle = (title) => {
  const titleElement = document.getElementsByTagName("title")[0];
  titleElement.innerText = title;
};
