import React, { useState, useEffect } from "react";

function Header() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div
      style={{
        width: "100%",
        background: "#1976d2",
        color: "white",
        padding: "16px 0",
        textAlign: "center",
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginBottom: 32,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {now.toLocaleDateString()} {now.toLocaleTimeString()}
    </div>
  );
}

function getTimeLeft(deadline) {
  const now = new Date();
  const end = new Date(deadline);
  const diff = end - now;
  if (diff <= 0) return "마감됨";
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return `${hours}시간 ${minutes}분 ${seconds}초 남음`;
}

// 현재 시간을 yyyy-MM-ddTHH:mm 형식으로 반환
function getNowDateTimeLocal() {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  const yyyy = now.getFullYear();
  const MM = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const hh = pad(now.getHours());
  const mm = pad(now.getMinutes());
  return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
}

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [deadline, setDeadline] = useState(getNowDateTimeLocal());
  const [, setTick] = useState(0); // for re-render

  // 1초마다 강제 리렌더링 (남은시간 갱신)
  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // deadline 기본값을 항상 현재시간으로 유지
  useEffect(() => {
    setDeadline(getNowDateTimeLocal());
  }, []);

  const handleAdd = () => {
    if (input.trim() === "" || deadline === "") return;
    setTodos([
      ...todos,
      {
        text: input,
        completed: false,
        deadline: new Date(deadline),
      },
    ]);
    setInput("");
    setDeadline(getNowDateTimeLocal());
  };

  const handleToggle = (idx) => {
    setTodos(
      todos.map((todo, i) =>
        i === idx ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (idx) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <Header />
      <div style={{ width: "100%", maxWidth: 400 }}>
        <h1 style={{ textAlign: "center" }}>Todo List</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="할 일을 입력하세요"
            style={{ padding: 8 }}
          />
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="마감일을 선택하세요"
            style={{ padding: 8 }}
          />
          <button onClick={handleAdd}>추가</button>
        </div>
        <ul style={{ padding: 0, listStyle: "none" }}>
          {todos.map((todo, idx) => (
            <li
              key={idx}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: "8px 0",
                background: "#fff",
                marginBottom: 8,
                borderRadius: 4,
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(idx)}
                />
                <span style={{ flex: 1 }}>{todo.text}</span>
                <button onClick={() => handleDelete(idx)}>삭제</button>
              </div>
              <div
                style={{
                  fontSize: "1em",
                  color: "#1976d2",
                  marginLeft: 28,
                  fontWeight: "bold",
                }}
              >
                남은시간: {getTimeLeft(todo.deadline)}
              </div>
              <div style={{ fontSize: "0.85em", color: "#666", marginLeft: 28 }}>
                마감: {todo.deadline.toLocaleString
                  ? todo.deadline.toLocaleString()
                  : new Date(todo.deadline).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;