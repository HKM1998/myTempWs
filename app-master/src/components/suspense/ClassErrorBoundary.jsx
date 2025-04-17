import React, { Component } from "react";

/**
 * 에러 발생시 fallback을 보여주는 컴포넌트
 */
class ClassErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 fallback UI를 표시하도록 상태를 업데이트합니다.
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    // 컴포넌트 스택, 오류 경계 등 오류에 대한 추가 정보를 기록합니다.
    console.error("Caught an error in ClassErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo: errorInfo });
    // 필요하다면 에러 로깅 서비스에 오류를 보고할 수도 있습니다.
  }

  render() {
    if (this.state.hasError) {
      // 오류가 발생하면 사용자 정의 fallback UI를 렌더링할 수 있습니다.
      return this.props.fallback ? (
        <this.props.fallback error={this.state.error} />
      ) : (
        <div>Something went wrong!</div>
      );
    }

    return this.props.children;
  }
}

export default ClassErrorBoundary;
