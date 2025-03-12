import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./messagerie.css";

const socket = io("http://localhost:5000"); // URL du backend

export default function MessagingPage() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentConv, setCurrentConv] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/conversations")
      .then((res) => res.json())
      .then((data) => setConversations(data));
  }, []);

  useEffect(() => {
    if (currentConv) {
      fetch(`http://localhost:5000/messages/${currentConv.id}`)
        .then((res) => res.json())
        .then((data) => setMessages(data));

      socket.emit("joinRoom", currentConv.id);

      socket.on("newMessage", (message) => {
        if (message.conversationId === currentConv.id) {
          setMessages((prev) => [...prev, message]);
        }
      });
    }
    return () => socket.off("newMessage");
  }, [currentConv]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        text: newMessage,
        conversationId: currentConv.id,
        sender: "user1", // À remplacer par l'ID utilisateur
      };
      socket.emit("sendMessage", messageData);
      setMessages((prev) => [...prev, messageData]);
      setNewMessage("");
    }
  };

  return (
    <div className="messaging-container">
      {/* Liste des conversations */}
      <div className="conversations-list">
        <h2>Conversations</h2>
        <ul>
          {conversations.map((conv) => (
            <li
              key={conv.id}
              onClick={() => setCurrentConv(conv)}
              className={currentConv?.id === conv.id ? "active" : ""}
            >
              {conv.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Fenêtre de messages */}
      <div className="messages-window">
        {currentConv ? (
          <>
            <div className="messages-list">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.sender === "user1" ? "sent" : "received"}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            {/* Input pour envoyer un message */}
            <div className="message-input">
              <input
                type="text"
                placeholder="Écris un message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={sendMessage}>Envoyer</button>
            </div>
          </>
        ) : (
          <div className="select-conversation">Sélectionne une conversation</div>
        )}
      </div>
    </div>
  );
}