import React from "react";

function TodoInput({ input, setInput, deadline, setDeadline, onAdd, getNowDateTimeLocal }) {
  return (
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
      <button onClick={onAdd}>추가</button>
    </div>
  );
}

export default TodoInput;