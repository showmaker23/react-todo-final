import React from "react";

function TodoList({ todos, onToggle, onDelete, getTimeLeft }) {
  return (
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
              onChange={() => onToggle(idx)}
            />
            <span style={{ flex: 1 }}>{todo.text}</span>
            <button onClick={() => onDelete(idx)}>삭제</button>
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
  );
}

export default TodoList;