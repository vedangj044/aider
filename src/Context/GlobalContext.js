import React, { useState, createContext, useEffect } from "react";
import firebase from "../Auth/Firebase";

export const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }) => {
  const db = firebase.database();

  const dataQ = [
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
  ];

  const [questions, setQuestions] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const [data, setData] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const saveQuestionToDB = async (question, id) => {
    await db
      .ref("poll")
      .child(id)
      .set(question)
      .then(() => {
        console.log("success!");
      });
  };

  const deleteQuestionFromDB = async (id) => {
    await db
      .ref("poll")
      .child(id)
      .remove()
      .then(() => console.log("Deleted"));
  };

  const saveAnnouncementToDB = async (ann, id) => {
    await db
      .ref("announcement")
      .child(id)
      .set(ann)
      .then(() => {
        console.log("success!");
      });
  };

  const deleteAnnouncementFromDB = async (id) => {
    await db
      .ref("announcement")
      .child(id)
      .remove()
      .then(() => console.log("Deleted"));
  };

  useEffect(() => {
    const fetchDb = async () => {
      const storiesRef = db.ref("poll");
      const announcementRef = db.ref("announcement");
      await storiesRef.on("value", (snap) => {
        let dbQuestions = snap.val();
        let temp = [];
        for (let question in dbQuestions) {
          // setQuestions([dbQuestions[questions], ...questions]);
          temp.push({ id: question, ...dbQuestions[question] });
        }
        setQuestions(temp, ...questions);
      });

      await announcementRef.on("value", (snap) => {
        let ann = snap.val();
        let temp = [];
        temp = Object.values(ann);
        const annTemp = [];
        temp.forEach((item, i) =>
          annTemp.push({ id: `an${i + 1}`, msg: item })
        );
        setAnnouncements(annTemp, ...announcements);
        console.log(temp);
        console.log(annTemp);
      });
    };
    fetchDb();
  }, [db]);

  return (
    <GlobalContext.Provider
      value={{
        questions,
        setQuestions,
        syllabus,
        setSyllabus,
        data,
        setData,
        saveQuestionToDB,
        deleteQuestionFromDB,
        announcements,
        setAnnouncements,
        saveAnnouncementToDB,
        deleteAnnouncementFromDB,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
