import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, RefreshCw, Trash2, HelpCircle } from "lucide-react";
import { chatWithGemini } from "../services/geminiService";

export const AIChatbot = ({ destinationName = "World & India Destinations" }) => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Namaste & Hello! I am GoYunetra Assistant. Ask me ANY question about travel, packing, flight hacks, local food, visas, or destinations around the world!`
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const quickPrompts = [
    `✈️ Flight booking hacks`,
    `🍛 Must-try food in ${destinationName}`,
    `🎒 Smart packing list`,
    `🛂 Visa & document tips`,
    `💰 Daily budget calculation`
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const responseText = await chatWithGemini(destinationName, query, messages);
      setMessages((prev) => [...prev, { sender: "ai", text: responseText }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Sorry, I had trouble processing that request. Please try asking again!" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        sender: "ai",
        text: `Chat reset! Ask me any new question about exploring ${destinationName} or travel advice.`
      }
    ]);
  };

  // Simple formatting helper for markdown bold and bullet points
  const formatText = (text) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <React.Fragment key={idx}>
          {formattedParts}
          {idx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div
      className="glass-card"
      style={{
        borderRadius: "var(--radius-md)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        height: "540px"
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "14px", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "12px", background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)" }}>
            <Sparkles size={20} color="#ffffff" />
          </div>
          <div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: "800", color: "var(--text-primary)" }}>
              GoYunetra Assistant
            </h4>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: "600" }}>
              Universal Travel Intelligence • Responds Instantly
            </span>
          </div>
        </div>

        {/* Clear Chat */}
        <button
          onClick={handleClear}
          title="Reset Conversation"
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            padding: "6px"
          }}
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 0",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start"
            }}
          >
            {msg.sender === "ai" && (
              <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Bot size={16} color="var(--accent-primary)" />
              </div>
            )}
            <div
              style={{
                maxWidth: "85%",
                padding: "12px 16px",
                borderRadius: msg.sender === "user" ? "18px 18px 2px 18px" : "18px 18px 18px 2px",
                background: msg.sender === "user" ? "var(--gradient-primary)" : "var(--bg-glass-heavy)",
                color: msg.sender === "user" ? "#ffffff" : "var(--text-primary)",
                fontSize: "0.88rem",
                lineHeight: 1.55,
                border: msg.sender === "ai" ? "1px solid var(--border-subtle)" : "none",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              {formatText(msg.text)}
            </div>
            {msg.sender === "user" && (
              <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(245, 158, 11, 0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <User size={16} color="#f59e0b" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-primary)", fontSize: "0.82rem", fontWeight: "600", paddingLeft: "40px" }}>
            <RefreshCw size={15} className="animate-spin" />
            <span>GoYunetra is composing smart travel advice...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "10px", scrollbarWidth: "none" }}>
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            style={{
              padding: "6px 12px",
              borderRadius: "var(--radius-full)",
              background: "var(--bg-glass)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-secondary)",
              fontSize: "0.75rem",
              fontWeight: "600",
              whiteSpace: "nowrap",
              cursor: "pointer",
              transition: "all var(--transition-fast)"
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        style={{ display: "flex", gap: "8px", paddingTop: "10px", borderTop: "1px solid var(--border-subtle)" }}
      >
        <input
          type="text"
          placeholder="Ask ANY question (travel tips, food recipes, visas, packing)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            background: "var(--bg-input)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-full)",
            padding: "10px 18px",
            color: "var(--text-primary)",
            fontSize: "0.88rem",
            outline: "none"
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="btn-primary"
          style={{ width: "42px", height: "42px", padding: 0, justifyContent: "center", opacity: (!input.trim() && !loading) ? 0.7 : 1 }}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};
