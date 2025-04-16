import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

/**
 * 레포지토리 Readme 조회
 * @param {{repo : string, login : string}} 레포지토리명 및 로그인 정보
 * @returns
 */
const RepositoryReadme = ({ repo, login }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [markdown, setMarkdown] = useState("");

  /**
   * 레포지토리의 Readme 비동기식 조회
   * 깃허브 API로 사용자 레포지토리 조회를 비동기식으로 실행
   * 가져온 데이터를 markdown에 저장
   * @param {string} login
   * @param {string} repo
   */
  const loadReadme = useCallback(async (login, repo) => {
    setLoading(true);
    const uri = `https://api.github.com/repos/${login}/${repo}/readme`;
    const { download_url } = await fetch(uri).then((res) => res.json());
    const md = await fetch(download_url).then((res) => res.text());
    setMarkdown(md);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!repo || !login) return;
    loadReadme(login, repo).catch(setError);
  }, [repo, loadReadme, login]);

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (loading) return <p>Loading...</p>;

  return <ReactMarkdown children={markdown} />;
};

export default RepositoryReadme;
