import React from "react";
import styles from "./Home.module.css";
import { Avatar, Grid, Paper } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import StorageIcon from "@material-ui/icons/Storage";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { Settings } from "@material-ui/icons";
import classNames from "classnames";

const Home = () => {
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
              <div className={styles.questions}>
                <QuestionAnswerIcon />
                <h3>Questions</h3>
                {/* <PlayCircleFilledIcon /> */}
              </div>
              <div className={classNames(styles.syllabus, styles.selected)}>
                <ImportContactsIcon />
                <h3>Syllabus</h3>
                {/* <PlayCircleFilledIcon /> */}
              </div>
              <div className={styles.data}>
                <StorageIcon />
                <h3>Data</h3>
                {/* <PlayCircleFilledIcon /> */}
              </div>
              <div className={styles.tools}>
                <p>Tools</p>
                <div class={styles.settings}>
                  <Settings />
                  <h3>Settings</h3>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item md={9}>
            <div className={styles.details}>Hello2</div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Home;
