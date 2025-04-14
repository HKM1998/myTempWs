const express = require("express"); // express: 웹 서버 프레임워크
const bodyParser = require("body-parser"); // body-parser: 요청 본문을 JSON 형식으로 파싱
const cors = require("cors"); // cors: 다른 도메인에서의 요청 허용 (React 앱은 보통 다른 포트에서 실행됨)
const fs = require("fs").promises; // fs.promises: 비동기 파일 시스템 작업
const path = require("path"); // path: 파일 경로 관리
// const uuid = require('uuid'); // uuid: 고유 ID 생성을 위한 라이브러리
//  - 현재 코드는 uuid를 사용하지 않지만 필요에 따라 추가할 수 있습니다.

const app = express();
const PORT = 5000;
const DB_PATH = path.join(__dirname, "../data/tahoe_peaks.json");
// DB_PATH: tahoe_peaks.json 파일의 경로

app.use(cors());
app.use(bodyParser.json());

// 데이터 읽기 함수
const readData = async () => {
  // readData(): JSON 파일에서 데이터를 읽어오는 함수
  try {
    const data = await fs.readFile(DB_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("데이터 읽기 오류:", error);
    return [];
  }
};

// 데이터 쓰기 함수
const writeData = async (data) => {
  // writeData(): 데이터를 JSON 파일에 쓰는 함수
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("데이터 쓰기 오류:", error);
    return false;
  }
};

// GET: 모든 데이터 조회
app.get("/api/peaks", async (req, res) => {
  // /api/peaks (GET): 모든 봉우리 목록 조회
  const peaks = await readData();
  res.json(peaks);
});

// GET: 특정 ID 데이터 조회
app.get("/api/peaks/:id", async (req, res) => {
  // /api/peaks/:id (GET): 특정 ID의 봉우리 정보 조회
  const id = req.params.id;
  const peaks = await readData();
  const peak = peaks.find((p) => p.id === parseInt(id)); // 문자열 ID를 정수로 변환하여 비교
  if (!peak) {
    const peakByStringId = peaks.find((p) => p.id === id); // UUID도 검색
    if (peakByStringId) {
      return res.json(peakByStringId);
    }
  }

  if (peak) {
    res.json(peak);
  } else {
    res.status(404).json({ message: "데이터를 찾을 수 없습니다." });
  }
});

// POST: 데이터 추가
app.post("/api/peaks", async (req, res) => {
  // /api/peaks (POST): 새로운 봉우리 추가 (요청 본문에 name, elevation 포함)
  const newPeak = { ...req.body };
  const peaks = await readData();

  // 기존 데이터 중 가장 큰 id 값을 찾고 1을 더하여 새로운 id 생성
  const maxId = peaks.reduce(
    (max, peak) =>
      typeof peak.id === "number" && peak.id > max ? peak.id : max,
    0
  );
  newPeak.id = maxId + 1;

  peaks.push(newPeak);
  await writeData(peaks);
  res.status(201).json(newPeak);
});

// PUT: 특정 ID 데이터 수정
app.put("/api/peaks/:id", async (req, res) => {
  // /api/peaks/:id (PUT): 특정 ID의 봉우리 정보 수정
  // (요청 본문에 수정할 name, elevation 포함)
  const id = parseInt(req.params.id);
  const updatedPeak = req.body;
  const peaks = await readData();
  const index = peaks.findIndex((p) => p.id === id);

  if (index !== -1) {
    peaks[index] = { ...peaks[index], ...updatedPeak, id: id };
    await writeData(peaks);
    res.json(peaks[index]);
  } else {
    res.status(404).json({ message: "데이터를 찾을 수 없습니다." });
  }
});

// DELETE: 특정 ID 데이터 삭제
app.delete("/api/peaks/:id", async (req, res) => {
  // /api/peaks/:id (DELETE): 특정 ID의 봉우리 삭제
  const id = req.params.id;
  const peaks = await readData();
  const updatedPeaks = peaks.filter(
    (p) => p.id !== parseInt(id) && p.id !== id
  ); // 정수 또는 문자열 ID로 삭제

  if (peaks.length > updatedPeaks.length) {
    await writeData(updatedPeaks);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "데이터를 찾을 수 없습니다." });
  }
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
