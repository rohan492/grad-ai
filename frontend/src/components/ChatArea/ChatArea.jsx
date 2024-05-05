import React, { useEffect, useRef } from "react";
import { Skeleton } from "antd";
import { motion } from "framer-motion";

import brandLogo from "../../assets/brand-logo.png";
import splitString from "../../utils/splitString";

import { QueryRag } from "../../services/QueryServices";

import "./ChatArea.css";

const ChatArea = ({ chatArray, loading, setLoading, setChatArray, question }) => {
  let lastAnswerRef = useRef(null);

  useEffect(() => {
    let refTimeoutId;
    if (lastAnswerRef.current) {
      refTimeoutId = setTimeout(() => {
        lastAnswerRef.current.scrollIntoView({
          behavior: "smooth",
          inline: "nearest",
          block: "start",
        });
      }, 10);
    }

    return () => clearTimeout(refTimeoutId);
  });

  const ragCollectionID = localStorage.getItem("ragCollectionID")
  const handleDataFetch = async () => {
    const response = await QueryRag({
      question,
      ragCollectionID
    })
    console.log(response.data.answer)
    if (response.status === 200) {
      setChatArray(prevChatArray => {
        const lastIndex = prevChatArray.length - 1
        return [
          ...prevChatArray.slice(0, lastIndex),
          {
            ...prevChatArray[lastIndex],
            answer: response.data.answer
          }
        ]
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    if (ragCollectionID) {
      handleDataFetch()
    }
  }, []);

  const userImg = localStorage.getItem("profile_url");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  const isNumberedList = (text) => {
    // Check if the text starts with a number followed by a dot and a space
    const result = /^(-|\d+\.\s)/.test(text?.trim());
    // console.log(text, result1);
    return result;
  };

  return (
    <div className="h-[90%] overflow-scroll flex flex-col gap-8">
      {chatArray.map((chat, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="flex gap-8">
            <div className="flex justify-center items-start">
              <img
                src={userImg}
                alt="userImg"
                style={{ width: 40, height: 40 }}
                className="rounded-full"
              />
            </div>
            <div className="text-justify flex-1 p-2 rounded-md text-white bg-cyan-800 relative">
              <div className="triangle-left tl-question absolute left-[-20px] top-2" />
              {chat.question}
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex justify-center items-start">
              <img
                src={brandLogo}
                alt="brandLogo"
                style={{ width: 40, height: 40 }}
                className="rounded-full bg-black"
              />
            </div>
            <div
              className="text-justify flex-1 p-2 rounded-md text-white bg-blue-800 relative"
              ref={index === chatArray.length - 1 ? lastAnswerRef : null}
            >
              <div className="triangle-left tl-answer absolute left-[-20px] top-2" />
              <Skeleton
                loading={loading && index === chatArray.length - 1}
                active
              />
              {(!loading || index !== chatArray.length - 1) && (
                chat.answer.split('\n').map((sentence, indx) => (
                  <motion.div
                    initial="hidden"
                    animate="reveal"
                    transition={{ staggerChildren: 0.002 }}
                    key={indx}
                    className={`${isNumberedList(sentence.trim()) && 'pl-5'}`}
                    // onAnimationComplete={() => setSourceVisible(true)}
                  >
                    {splitString(sentence).map((ch, idx) => (
                      <motion.span
                        key={idx}
                        transition={{ duration: 0.5 }}
                        variants={charVariants}
                      >
                        {ch}
                      </motion.span>
                    ))}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatArea;
