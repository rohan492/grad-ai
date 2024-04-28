import React, { useState } from "react";

import "./ChatWindow.css";
import ChatWindowInitial from "../../components/ChatWindowInitial/ChatWindowInitial.jsx";
import ChatWindowLater from "../../components/ChatWindowLater/ChatWindowLater.jsx";

const ChatWindow = () => {
  const [initialPage, setInitialPage] = useState(true);
  const [question, setQuestion] = useState("");
  const [inputFilled, setInputFilled] = useState(false);

  const [chatArray, setChatArray] = useState([]);

  return initialPage ? (
    <ChatWindowInitial
      question={question}
      setInitialPage={setInitialPage}
      setQuestion={setQuestion}
      inputFilled={inputFilled}
      setInputFilled={setInputFilled}
      chatArray={chatArray}
      setChatArray={setChatArray}
    />
  ) : (
    <ChatWindowLater
      question={question}
      inputFilled={inputFilled}
      setInputFilled={setInputFilled}
      setQuestion={setQuestion}
      chatArray={chatArray}
      setChatArray={setChatArray}
    />
  );
};

export default ChatWindow;
