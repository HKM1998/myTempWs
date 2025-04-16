# myTempWs

프로젝트 전 템플릿 작성용

### 컴포넌트

**/app-master/src/components**

1. Memo

   메모이제이션 사용 예제

2. DataFetcher

   url 정보로 비동기 fetch 실행 컴포넌트

3. ShoppingCart

   useReducer 사용 예제 컴포넌트 데이터 (fliter, map 등 포함)

4. CRUD

   REST API 처럼 HTTP 메서드를 활용한 CRUD 예제

5. RepositoryReadme

   깃허브 API로 Read me 조회
   async/await로 비동기 통신 사용, ReactMarkdown 사용

### 훅

**/app-master/src/hooks**

1. useAnyKeyToRender

   컴포넌트가 랜더링 된후 unmount 될때까지 keydown 이벤트 감지 및 리렌더링

2. useMousePosition

   컴포넌트가 랜더링 된후 unmount 될때까지 mousemove 이벤트 감지 및 리렌더링

### 이벤트

**/app-master/src/common/eventHandle**

1. InputForm.handleChange

   태그의 id 값으로 객체 key 값을 매칭하여 value를 저장하는 핸들러

2. TodoList

   localStorage 에 TODO 리스트를 저장하고 읽어오는 컴포넌트

   - TodoList.handleAddClick

     스프레드 문법으로 객체값을 추가

   - TodoList.handleDeleteClick

     객체배열 index 값 기준으로 filter 함수를 통해 값 삭제

   - TodoList.toggleComplete

     객체배열 index 값 기준으로 map 함수를 통해 완료 여부 변경

### 공용 함수

**/app-master/src/common**

1. 배열 - arrays.js

   - createArray

     배열 길이를 입력받아 해당 길이만큼의 배열을 리턴하는 함수

2. 문자열 처리 - string.js

   - validateEmail

     이메일 형식 처리 정규식

### 서버

**/app-master/src/server**

1. 서버 node - server.js

   - readData

     데이터 읽기 함수

   - writeData

     테이터 쓰기 함수
