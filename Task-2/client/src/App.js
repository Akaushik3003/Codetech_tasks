import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import "./App.css";

const socket = io("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [tempName, setTempName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.on("messageHistory", (history) => {
      setMessages(history);
    });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("messageHistory");
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("sendMessage", { user: username, text: message });
      setMessage("");
      setShowEmojiPicker(false);
    }
  };

  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  if (!username) {
    return (
      <div className="App center-screen">
        <div className="card join-card">
          <h2>Welcome to <span className="highlight">CodeTech Chat Stream 💻</span></h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setUsername(tempName.trim())}
          />
          <button onClick={() => setUsername(tempName.trim())}>Join Chat</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App chat-theme">
      <header className="chat-header">
        <h1><span className="highlight">CodeTech 💻</span> Live Chat Stream</h1>
      </header>

      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className="chat-message">
            <span className="timestamp">{msg.time}</span>
            <strong className="username">{msg.user}</strong>:{" "}
            <span className="text">{msg.text}</span>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      <div className="input-area">
        <button onClick={() => setShowEmojiPicker((prev) => !prev)} className="emoji-btn">😀</button>
        {showEmojiPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="send-btn">Send</button>
      </div>
    </div>
  );
}

export default App;
