import React, { useState, createContext } from "react";

export const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([
    {
      question: "Where is Indore located ?",
      id: "Q1001",
      option1: {
        value: "Madhya Pradesh",
        count: 29,
      },
      option2: {
        value: "Rajasthan",
        count: 12,
      },
      answer: "Madhya Pradesh",
    },
    {
      question: "Where is Indore located ?",
      id: "Q1002",
      option1: {
        value: "Madhya Pradesh",
        count: 29,
      },
      option2: {
        value: "Rajasthan",
        count: 12,
      },
      answer: "Madhya Pradesh",
    },
    {
      question: "Where is Indore located ?",
      id: "Q1003",
      option1: {
        value: "Madhya Pradesh",
        count: 29,
      },
      option2: {
        value: "Rajasthan",
        count: 12,
      },
      answer: "Madhya Pradesh",
    },
  ]);
  const [syllabus, setSyllabus] = useState([]);
  const [data, setData] = useState([]);

  return (
    <GlobalContext.Provider
      value={{ questions, setQuestions, syllabus, setSyllabus, data, setData }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
