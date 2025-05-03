import React, { useEffect, useRef, useState } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

function ChatBox({ seller, onClose }) {
  const [messages, setMessages] = useState([
    { from: "seller", text: `Hi, this is ${seller}. How can I help you?` },
  ]);
  const [newMsg, setNewMsg] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new ReconnectingWebSocket("ws://localhost:8000/ws/chat/");
    socketRef.current = socket;

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, { from: "seller", text: data.message }]);
    };

    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: newMsg }]);
    socketRef.current.send(JSON.stringify({ message: newMsg }));
    setNewMsg("");
  };

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">
          Chat with {seller}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>
      </div>

      <div className="h-64 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`text-sm ${
              msg.from === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg ${
                msg.from === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center border-t px-4 py-3">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="flex-grow border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
