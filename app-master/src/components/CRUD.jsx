import { useEffect, useState } from "react";

/**
 * 리스트 컴포넌트 : 데이터 목록 렌더링
 * @param {*} param0
 * @returns 목록 ul 컴포넌트
 */
const List = ({ data = [], renderItem, renderEmpty }) => {
  return !data.length ? (
    renderEmpty // 데이터 없으면 renderEmpty 렌더링
  ) : (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

/**
 * 추가, 수정, 삭제가 포함된 목록 컴포넌트
 * @returns
 */
function CRUD() {
  const [peaks, setPeaks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [selectedPeak, setSelectedPeak] = useState(null); // 수정시 사용할 데이터
  const [isEditing, setIsEditing] = useState(false); // 수정인지 추가인지 확인자
  const [formData, setFormData] = useState({
    name: "",
    elevation: "",
  }); // 전송 데이터

  /**
   * 마운트시 데이터 로딩
   */
  useEffect(() => {
    fetch("http://localhost:5000/api/peaks")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Http error status : ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPeaks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류 발생 : ", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  /**
   * 선택 데이터 정보 설정 및 수정 모달 열기
   * @param {object} peak
   */
  const handleSelectPeak = (peak) => {
    setSelectedPeak(peak);
    setFormData({ name: peak.name, elevation: peak.elevation.toString() });
    setIsEditing(true);
  };

  /**
   * 입력 필드 값 변경시 state 변경
   * @param {Event} event
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target; // jsx 태그의 name, value prop의 값을 가져와서 값 반영
    setFormData({ ...formData, [name]: value });
  };

  /**
   * 수정 폼 데이터 등록
   * @returns
   */
  const handleUpdatePeak = () => {
    if (!selectedPeak) return;
    fetch(`http://localhost:5000/api/peaks/${selectedPeak.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        elevation: parseInt(formData.elevation),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Http error status : ${response.status}`);
        }
        return response.json();
      })
      .then((updatedPeak) => {
        setPeaks(
          peaks.map((peak) => (peak.id === updatedPeak.id ? updatedPeak : peak))
        );
        setSelectedPeak(null);
        setIsEditing(false);
        setFormData({ name: "", elevation: "" });
      })
      .catch((error) => {
        console.error("데이터를 수정 중 오류 발생 : ", error);
        setError("데이터를 수정 중 오류가 발생 했습니다.");
        setLoading(false);
      });
  };

  /**
   * 삭제 클릭
   * @param {number} id
   * @returns
   */
  const handleDeletePeak = (id) => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) return;

    fetch(`http://localhost:5000/api/peaks/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Http error status : ${response.status}`);
        }

        setPeaks(peaks.filter((peak) => peak.id !== id));
        setSelectedPeak(null);
        setIsEditing(false);
        setFormData({ name: "", elevation: "" });
      })
      .catch((error) => {
        console.error("데이터를 삭제 중 오류 발생 : ", error);
        setError("데이터를 삭제 중 오류가 발생 했습니다.");
      });
  };

  /**
   * 등록
   */
  const handleCreatePeak = () => {
    fetch(`http://localhost:5000/api/peaks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        elevation: parseInt(formData.elevation),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Http error status : ${response.status}`);
        }
        return response.json();
      })
      .then((newPeak) => {
        setPeaks([...peaks, newPeak]);
        setSelectedPeak(null);
        setIsEditing(false);
        setFormData({ name: "", elevation: "" });
      })
      .catch((error) => {
        console.error("데이터를 추가 중 오류 발생 : ", error);
        setError("데이터를 추가 중 오류가 발생 했습니다.");
        setLoading(false);
      });
  };

  /**
   * 모달 화면 열기
   */
  const handleAddPeak = () => {
    setSelectedPeak(null);
    setIsEditing(true);
    setFormData({ name: "", elevation: "" });
  };

  /**
   * 상태 초기화
   */
  const handleCancelEditor = () => {
    setSelectedPeak(null);
    setIsEditing(false);
    setFormData({ name: "", elevation: "" });
  };

  // 로딩 / 에러
  if (loading) {
    return <p>Loading peaks......</p>;
  }
  if (error) {
    return <p>Error : {error}</p>;
  }

  return (
    <div>
      <h1>Tahoe Peaks</h1>
      <button onClick={handleAddPeak}>Add New Peak</button>
      <List
        data={peaks}
        renderItem={(item) => (
          <div>
            {item.name} - {item.elevation.toLocaleString()} ft.
            <button onClick={() => handleSelectPeak(item)}>수정</button>
            <button onClick={() => handleDeletePeak(item.id)}>삭제</button>
          </div>
        )}
        renderEmpty={<p>Peak Data is Empty.</p>}
      />
      {isEditing && (
        <div>
          <h2>{selectedPeak ? "수정" : "등록"}</h2>
          <label>
            Name :{" "}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Elevation :{" "}
            <input
              type="number"
              name="elevation"
              value={formData.elevation}
              onChange={handleInputChange}
            />
          </label>
          <br />
          {selectedPeak ? (
            <button onClick={handleUpdatePeak}>수정</button>
          ) : (
            <button onClick={handleCreatePeak}>등록</button>
          )}
          <button onClick={handleCancelEditor}>취소</button>
        </div>
      )}
    </div>
  );
}

export default CRUD;
