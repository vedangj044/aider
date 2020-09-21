import React, { useState, useContext, useCallback } from "react";
import styles from "./Home.module.css";
import { withRouter } from "react-router-dom";
import {
  Avatar,
  Grid,
  Paper,
  Card,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  DialogContentText,
  Tooltip,
  Menu,
  MenuItem,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import StorageIcon from "@material-ui/icons/Storage";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { AddCircle, Settings } from "@material-ui/icons";
import classNames from "classnames";
import { GlobalContext } from "../../Context/GlobalContext";
import DeleteIcon from "@material-ui/icons/Delete";
import { v4 as uuidv4 } from "uuid";

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
  const [open, setOpen] = useState(false);
  const [qid, setQid] = useState(null);

  const getWidth = (index, i) => {
    const total = questions[index].options.reduce(
      (currentTotal, option) => currentTotal + option.votes,
      0
    );
    const votes = questions[index].options[i].votes;

    return (votes / total) * 100;
  };

  const onClickDelete = (id) => {
    setOpen(true);
    setQid(id);
  };

  const DeleteQuestion = () => {
    setQuestions(questions.filter((question) => question.id !== qid));
    setQid(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  //Add Question and Announcement

  const [qOpen, setQopen] = useState(false);

  const closeDialog = () => {
    setQopen(false);
  };

  const AddQuestion = () => {
    handleCloseMenu();
    setQopen(true);
  };

  const AddQuestionToDb = () => {};

  const AddAnnouncement = () => {
    setAnchorEl(null);
  };

  //

  const WhichDialog = ({ which }) => {
    switch (which) {
      case "deleteQuestion":
        return (
          <DialogComponent
            open={open}
            handleClose={handleClose}
            title={"Are you sure you wish to delete the question ?"}
            content={null}
            negative={"No"}
            positive={"Yes, Delete"}
            trigger={DeleteQuestion}
          />
        );
      case "addQuestion":
        return (
          <DialogComponent
            title="Add Question"
            negative="Cancel"
            positive="Submit"
            trigger={AddQuestionToDb}
            open={qOpen}
            handleClose={closeDialog}
            content={null}
            component={ContentForAddQuestion}
          />
        );
      default:
        break;
    }
  };

  return (
    <div className={styles.questionContainer}>
      <div className={styles.topbar}>
        <Tooltip placement="top" title="Add">
          <IconButton onClick={handleClick}>
            <AddCircle />
          </IconButton>
        </Tooltip>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={AddQuestion}>Question</MenuItem>
          <MenuItem onClick={AddAnnouncement}>Announcement</MenuItem>
        </Menu>
      </div>
      <div className={styles.questionDetails}>
        {!questions || !questions.length ? (
          <div className={styles.noData}>
            <p>Oops! Seems like you haven't added anything yet :(</p>
          </div>
        ) : (
          <Grid container spacing={4}>
            {questions.map((question, index) => {
              return (
                <Grid key={index} item xl={4} lg={4} md={6} sm={12} s={12}>
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
                    <Tooltip placement="bottom" title="Delete Question">
                      <IconButton
                        onClick={() => onClickDelete(question.id)}
                        className={styles.deleteBtn}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>

      <WhichDialog which={"deleteQuestion"} />
      <WhichDialog which={"addQuestion"} />
    </div>
  );
};

const SyllabusComponent = () => {
  return <div>Hello Syllabus</div>;
};

const DataComponent = () => {
  const [value, setValue] = useState();

  return <div>Hello Data</div>;
};

const DialogComponent = ({
  open,
  handleClose,
  title,
  content,
  component: ContentComponent,
  positive,
  negative,
  trigger,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className={styles.dialogTitle} id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent className={styles.content}>
        {ContentComponent ? <ContentComponent /> : content}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {negative}
        </Button>
        <Button
          onClick={() => {
            handleClose();
            trigger();
          }}
          color="primary"
          autoFocus
        >
          {positive}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ContentForAddQuestion = () => {
  const [questiontoAdd, setQuestionToAdd] = useState("");
  const [option1, setOption1] = useState("option1");
  const [option2, setOption2] = useState("option2");
  const [option3, setOption3] = useState("option3");
  const [option4, setOption4] = useState("option4");
  const [answer, setAnswer] = useState(option1);

  const data = {
    id: uuidv4(),
    question: questiontoAdd,
    options: [
      {
        name: option1,
        votes: 0,
      },
      {
        name: option2,
        votes: 0,
      },
      {
        name: option3,
        votes: 0,
      },
      {
        name: option4,
        votes: 0,
      },
    ],
    answer,
  };

  const saveToLocal = () => {
    localStorage.setItem("questions", JSON.stringify(data));
  };

  return (
    <form className={styles.addQuestionForm}>
      <TextField
        required
        className={styles.inputField}
        type="text"
        size="small"
        value={questiontoAdd}
        onChange={(e) => {
          setQuestionToAdd(e.target.value);
          saveToLocal();
        }}
        variant="filled"
        label="Question"
      />
      <FormControl className={styles.fullWidth} component="fieldset">
        {/* <FormLabel className={styles.description} component="legend">
          Select the option which is answer
        </FormLabel> */}
        <p>Selected option will be considered as answer</p>
        <RadioGroup
          aria-label="options"
          name="options"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            saveToLocal();
          }}
        >
          <div className={styles.optionInput}>
            <Radio value={option1} />
            <input
              className={styles.inputField}
              type="text"
              size="small"
              // value={option1}
              onChange={(e) => {
                setOption1(e.target.value);
                saveToLocal();
              }}
              variant="standard"
              placeholder="Enter Option 1"
            />
          </div>
          <div className={styles.optionInput}>
            <Radio value={option2} />
            <input
              className={styles.inputField}
              type="text"
              size="small"
              // value={option2}
              onChange={(e) => {
                setOption2(e.target.value);
                saveToLocal();
              }}
              variant="standard"
              placeholder="Enter Option 2"
            />
          </div>
          <div className={styles.optionInput}>
            <Radio value={option3} />

            <input
              className={styles.inputField}
              type="text"
              size="small"
              // value={option3}
              onChange={(e) => {
                setOption3(e.target.value);
                saveToLocal();
              }}
              variant="standard"
              placeholder="Enter Option 3"
            />
          </div>
          <div className={styles.optionInput}>
            <Radio value={option4} />

            <input
              className={styles.inputField}
              type="text"
              size="small"
              // value={option4}
              onChange={(e) => {
                setOption4(e.target.value);
                saveToLocal();
              }}
              variant="standard"
              placeholder="Enter Option 4"
            />
          </div>
        </RadioGroup>
      </FormControl>
    </form>
  );
};
