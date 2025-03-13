import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Messagerie.css";

const socket = io("https://app-787be4c4-3ac8-43da-a1e2-e869e769344d.cleverapps.io");

export default function MessagingPage() {
  const [allMessages, setAllMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedPartnerId, setSelectedPartnerId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");

    if (storedId && storedToken) {
      fetch(`https://app-787be4c4-3ac8-43da-a1e2-e869e769344d.cleverapps.io/messages/user/${storedId}`)
        .then((res) => res.json())
        .then((data) => {
          setAllMessages(data);
          const grouped = {};
          data.forEach((m) => {
            const me = parseInt(storedId, 10);
            const partner = m.id_sender === me ? m.id_receiver : m.id_sender;
            if (!grouped[partner]) grouped[partner] = [];
            grouped[partner].push(m);
          });
          const convArray = Object.keys(grouped).map((partnerId) => ({
            partnerId: parseInt(partnerId, 10),
            messages: grouped[partnerId],
          }));
          Promise.all(
            convArray.map(async (conv) => {
              const res = await fetch(`https://app-787be4c4-3ac8-43da-a1e2-e869e769344d.cleverapps.io/api/users/${conv.partnerId}`);
              const partnerData = await res.json();
              return {
                ...conv,
                partnerName: partnerData.nom,
                partnerPrenom: partnerData.prenom,
              };
            })
          ).then((updatedConvs) => setConversations(updatedConvs));
        });

      fetch("https://app-787be4c4-3ac8-43da-a1e2-e869e769344d.cleverapps.io/api/currentUser", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          userId: storedId,
        },
      })
        .then((res) => res.json())
        .then((d) => setUser(d));
    }
  }, []);

  useEffect(() => {
    if (selectedPartnerId && user) {
      const me = user.id;
      const conv = conversations.find((c) => c.partnerId === selectedPartnerId);
      if (conv) {
        setMessages(conv.messages);
      }
      const roomName = `${me}-${selectedPartnerId}`;
      socket.emit("joinRoom", roomName);

      socket.on("newMessage", (msg) => {
        const partner = msg.id_sender === me ? msg.id_receiver : msg.id_sender;
        if (partner === selectedPartnerId) {
          setMessages((prev) => [...prev, msg]);
          setConversations((prev) =>
            prev.map((c) => {
              if (c.partnerId === partner) {
                return { ...c, messages: [...c.messages, msg] };
              }
              return c;
            })
          );
        }
        setAllMessages((prev) => [...prev, msg]);
      });

      return () => {
        socket.off("newMessage");
      };
    }
  }, [selectedPartnerId, user, conversations]);

  const sendMessage = () => {
    if (newMessage.trim() && user && selectedPartnerId) {
      const msgData = {
        id_sender: user.id,
        id_receiver: selectedPartnerId,
        message: newMessage.trim(),
      };
      socket.emit("sendMessage", msgData);
      setNewMessage("");
    }
  };

  return (
    <div className="messaging-container">
      <div className="sidebar">
        <h3 className="h3title">Conversations</h3>
        <ul>
          {conversations.map((conv) => (
            <li
              key={conv.partnerId}
              onClick={() => setSelectedPartnerId(conv.partnerId)}
              className={selectedPartnerId === conv.partnerId ? "active" : ""}
            >
              {conv.partnerPrenom} {conv.partnerName}
            </li>
          ))}
        </ul>
      </div>
      <div className="messages-panel">
        {selectedPartnerId ? (
          <>
            <div className="messages-list">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`message-container ${m.id_sender === user?.id ? "sent" : "received"
                    }`}
                >
                  <div className="message-bubble">{m.message}</div>
                  <div className="message-time">
                    {m.date_message &&
                      new Date(m.date_message).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </div>
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Écris un message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <button onClick={sendMessage}>Envoyer</button>
            </div>
          </>
        ) : (
          <div className="no-selection">Sélectionne une conversation</div>
        )}
      </div>
    </div>
  );
}
