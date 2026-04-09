import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function ChatPage() {
  const { state } = useLocation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages([...messages, { text: message }]);
    setMessage("");
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Chat with {state?.name}
      </h2>

      <div className="border p-4 h-64 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <span className="bg-gray-200 px-2 py-1 rounded">
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border px-2 py-2 rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-[#C9A227] px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}