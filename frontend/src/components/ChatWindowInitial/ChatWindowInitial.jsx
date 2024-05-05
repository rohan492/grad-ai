import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input, message } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import "./ChatWindowInitial.css";

const { TextArea } = Input;

const ChatWindowInitial = ({
  question,
  setInitialPage,
  setQuestion,
  inputFilled,
  setInputFilled,
  chatArray,
  setChatArray
}) => {
  const navigate = useNavigate()

  const handleChange = (e) => {
    if (e.target.value.trim() !== "") {
      setInputFilled(true);
      setQuestion(e.target.value);
    } else {
      setInputFilled(false);
    }
  };

  const ragCollectionID = localStorage.getItem("ragCollectionID")
  // Who is the most influential person of 2023?
  // answer: "The most influential person of 2023 is not clearly defined as the list of influential people varies based on different sources and rankings. However, some of the names that appear on the Time Magazine's 100 Most Influential People of 2023 list include Michael B. Jordan, Anthony Albanese, Elon Musk, Shah Rukh Khan, Keanu Reeves, Taylor Swift, and others. It's important to note that the concept of influence is subjective and can vary depending on the criteria used for evaluation."
  const handleSend = async () => {
    if (inputFilled) {
      if (ragCollectionID) {
        setChatArray([
          {
            question,
          }
        ])
        setInitialPage(false);
      } else {
        message.error("Please upload some files for context!")
        navigate("/rag-upload")
      }
    }
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend();
    }
  };

  return (
    <div className="flex flex-col items-center justify-start mt-40 gap-5 h-full">
      <div className="text-2xl">Ask Your Questions Here</div>
      <div className="relative w-full flex justify-center items-center">
        <TextArea
          autoSize={{ minRows: 3, maxRows: 5 }}
          placeholder="Shoot"
          className="w-[40%] chatWindowTextArea text-xl"
          onChange={handleChange}
          autoFocus
          onPressEnter={handlePressEnter}
        />
        <ArrowRightOutlined
          className={`${
            inputFilled
              ? "bg-[#213547] text-white cursor-pointer"
              : "bg-white text-black cursorNotAllowed"
          } border border-[#213547] absolute z-20 bottom-2 right-[31%] p-2 rounded-full`}
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default ChatWindowInitial;
