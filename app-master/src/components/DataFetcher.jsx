import { useMemo, useState, useEffect } from "react";

/**
 * 비동기식으로 url 정보로 데이터를 조회하고 출력하는 컴포넌트
 * @param {string} url
 * @returns
 */
const DataFetcher = ({ url }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("API 호출 실패");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const cachedData = useMemo(() => data, [data]);

  if (loading) return <div>Loading....................</div>;
  if (error) return <div>Error : {error}</div>;

  return (
    <div>
      {cachedData &&
        cachedData.map((item) => <div key={item.id}>{item.name}</div>)}
    </div>
  );
};

export default DataFetcher;
