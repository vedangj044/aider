import React, { useState, useContext, useCallback } from "react";
import styles from "./Home.module.css";
import { withRouter } from "react-router-dom";
import { Avatar, Grid, Paper, Card, IconButton } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import StorageIcon from "@material-ui/icons/Storage";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { Settings } from "@material-ui/icons";
import classNames from "classnames";
import { GlobalContext } from "../../Context/GlobalContext";
import DeleteIcon from "@material-ui/icons/Delete";

const Home = ({ history }) => {
  const CurrentComponent = () => {
    switch (history.location.pathname) {
      case "/questions":
        return <QuestionsComponent />;
      case "/syllabus":
        return <SyllabusComponent />;
      case "/data":
        return <DataComponent />;
      default:
        return <QuestionsComponent />;
    }
  };

  return (
    <div className={styles.container}>
      <Paper className={styles.innerContainer}>
        <Grid container spacing={0}>
          <Grid item md={3}>
            <div className={styles.control}>
              <div className={styles.profile}>
                <Avatar variant="rounded">
                  <SupervisorAccountIcon color="primary" />
                </Avatar>
              </div>
              <div
                className={classNames(
                  styles.questions,
                  history.location.pathname === "/questions"
                    ? styles.selected
                    : null
                )}
                onClick={() => history.push("/questions")}
              >
                <QuestionAnswerIcon />
                <h3>Questions</h3>
                {/* <PlayCircleFilledIcon /> */}
              </div>
              <div
                className={classNames(
                  styles.syllabus,
                  history.location.pathname === "/syllabus"
                    ? styles.selected
                    : null
                )}
                onClick={() => history.push("/syllabus")}
              >
                <ImportContactsIcon />
                <h3>Syllabus</h3>
                {/* <PlayCircleFilledIcon /> */}
              </div>
              <div
                className={classNames(
                  styles.data,
                  history.location.pathname === "/data" ? styles.selected : null
                )}
                onClick={() => history.push("/data")}
              >
                <StorageIcon />
                <h3>Data</h3>
                {/* <PlayCircleFilledIcon /> */}
              </div>
              <div className={styles.tools}>
                <p>Tools</p>
                <div className={styles.settings}>
                  <Settings />
                  <h3>Settings</h3>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item md={9}>
            <div className={styles.details}>
              <CurrentComponent />
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default withRouter(Home);

const QuestionsComponent = () => {
  const { questions, setQuestions } = useContext(GlobalContext);

  const getWidth = (index, i) => {
    const total = questions[index].options.reduce(
      (currentTotal, option) => currentTotal + option.votes,
      0
    );

    const votes = questions[index].options[i].votes;

    return (votes / total) * 100;
  };

  const onClickDelete = (id) => {
    // const oldQuestions = questions;
    // const newQuestions = oldQuestions.filter((question) => question.id !== id);
    setQuestions(questions.filter((question) => question.id !== id));
  };

  return (
    <div>
      <Grid container spacing={4}>
        {questions.map((question, index) => {
          return (
            <Grid key={index} item xl={4} lg={4} md={6} sm={6} s={12}>
              <Card className={styles.questionCard}>
                <h4>{question.question}</h4>
                <div className={styles.options}>
                  {question.options.map((option, i) => {
                    return (
                      <div key={i} className={styles.option}>
                        <div
                          className={styles.votingBar}
                          style={{ width: `${getWidth(index, i)}%` }}
                        ></div>
                        <p>{option.name}</p>
                        <p>{option.votes}</p>
                      </div>
                    );
                  })}
                </div>
                <h5>{question.answer}</h5>
                <IconButton
                  onClick={() => onClickDelete(question.id)}
                  className={styles.deleteBtn}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

const SyllabusComponent = () => {
  return <div>Hello Syllabus</div>;
};

const DataComponent = () => {
  return <div>Hello Data</div>;
};
