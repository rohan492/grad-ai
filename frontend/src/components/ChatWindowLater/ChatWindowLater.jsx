import React, { useState, useEffect } from "react";

import { Input } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

import "./ChatWindowLater.css";
import ChatArea from "../ChatArea/ChatArea.jsx";

const { TextArea } = Input;

const ChatWindowLater = ({
  question,
  inputFilled,
  setInputFilled,
  setQuestion,
  chatArray,
  setChatArray,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setInputFilled(false);
    setQuestion("");
  }, []);

  const handleChange = (e) => {
    if (e.target.value.trim() !== "") {
      setInputFilled(true);
    } else {
      setInputFilled(false);
    }
    setQuestion(e.target.value);
  };

  // Tell me something about Devin AI
  const handleSend = () => {
    if (inputFilled) {
      setChatArray((prevChatArray) => [
        ...prevChatArray,
        {
          question,
          answer:
            "Devin AI is an autonomous artificial intelligence assistant tool created by Cognition Labs. It is branded as an 'AI software developer' and is the world's first fully autonomous AI software engineer. Devin is capable of coding, debugging, and developing, making it an innovative and groundbreaking tool for software engineering tasks. It automates complex tasks using AI, allowing developers to focus on more important work. Devin is also able to understand what is required to be built, write code, find and fix errors, and contribute as a tireless, skilled teammate. It has been the subject of much discussion and analysis in the programming and AI communities",
        },
      ]);
      setQuestion("");
      setInputFilled(false);
      setLoading(true);
    }
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative w-full h-full">
      <ChatArea
        chatArray={chatArray}
        loading={loading}
        setLoading={setLoading}
      />
      <TextArea
        autoSize={{ minRows: 2, maxRows: 3 }}
        placeholder="Ask more questions..."
        className="absolute bottom-0 w-[40%] left-[30%] rounded-full px-6 pr-16 text-base"
        style={{ resize: "none" }}
        autoFocus
        onChange={handleChange}
        value={question}
        onPressEnter={handlePressEnter}
      />
      <ArrowUpOutlined
        className={`${
          inputFilled
            ? "bg-[#213547] text-white cursor-pointer"
            : "bg-white text-black cursorNotAllowed"
        } border border-[#213547] absolute z-20 bottom-2 right-[31%] p-2 rounded-full`}
        onClick={handleSend}
      />
    </div>
  );
};

export default ChatWindowLater;
