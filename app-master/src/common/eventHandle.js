import { useEffect, useState } from "react";

/**
 * 입력값 객체로 State 저장하고 사용하는 컴포넌트
 * 이름, 이메일, 전화번호 입력
 */
const InputForm = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    tel: "",
  });

  const { name, email, tel } = inputs;

  /**
   * 태그의 id 값으로 객체 key 값을 매칭하여 value를 저장하는 핸들러
   * @param {Event} e 이벤트
   */
  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setInputs({
      ...inputs,
      [id]: value,
    });
  };

  return (
    <div>
      <div>
        <label htmlFor="name"></label>
        <input type="text" id="name" value={name} onChange={handleChange} />
        <br />
      </div>
      <div>
        <label htmlFor=""></label>
        <input type="email" id="email" value={email} onChange={handleChange} />
        <br />
      </div>
      <div>
        <label htmlFor=""></label>
        <input type="tel" id="tel" value={tel} onChange={handleChange} />
        <br />
      </div>
      <hr />
      <h2>회원 정보</h2>
      <p>이름 : {name}</p>
      <p>이메일 : {email}</p>
      <p>전화번호 : {tel}</p>
    </div>
  );
};

/**
 * localStorage 에 TODO 리스트를 저장하고 읽어오는 컴포넌트
 * todo 할일 입력
 */
const TodoList = () => {
  /**
   * localStorage[todos] 값을 가져와 사용
   */
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState("");

  /**
   * todos 값이 변경되면 localStorage 값 업데이트
   */
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /**
   * 추가 버튼 클릭시 todos에 값 업데이트
   */
  const handleAddClick = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          text: newTodo,
          completed: false,
        },
      ]);
      setNewTodo("");
    }
  };
  /**
   * 삭제 버튼 클릭시 todos 에서 index 기준으로 값 삭제
   * @param {number} index todos 인덱스
   */
  const handleDeleteClick = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };
  /**
   * 완료 여부 index 기준으로 토글
   * @param {number} index todos 인덱스
   */
  const toggleComplete = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <input
        value={newTodo}
        placeholder="할 일 추가..."
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddClick}>추가</button>
      <ul style={{ listStyle: "none" }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />
            {todo.text}
            <button onClick={() => handleDeleteClick(index)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
