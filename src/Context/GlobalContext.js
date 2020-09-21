import React, { useState, createContext } from "react";

export const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([
    {
      question: "Where is Indore located ?",
      id: "Q1001",
      options: [
        {
          name: "Madhya Pradesh",
          votes: 29,
        },
        {
          name: "Rajasthan",
          votes: 12,
        },
        {
          name: "Karnataka",
          votes: 4,
        },
        {
          name: "Jammu Kashmir",
          votes: 2,
        },
      ],
      answer: "Madhya Pradesh",
    },
    {
      question: "Where is Indore located ?",
      id: "Q1002",
      options: [
        {
          name: "Madhya Pradesh",
          votes: 29,
        },
        {
          name: "Rajasthan",
          votes: 12,
        },
        {
          name: "Karnataka",
          votes: 4,
        },
        {
          name: "Jammu Kashmir",
          votes: 2,
        },
      ],
      answer: "Madhya Pradesh",
    },
    {
      question: "Where is Indore located ?",
      id: "Q1003",
      options: [
        {
          name: "Madhya Pradesh",
          votes: 29,
        },
        {
          name: "Rajasthan",
          votes: 12,
        },
        {
          name: "Karnataka",
          votes: 4,
        },
        {
          name: "Jammu Kashmir",
          votes: 2,
        },
      ],
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
