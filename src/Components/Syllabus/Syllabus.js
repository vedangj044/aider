import React from "react";
import styles from "./Syllabus.module.css";
import { Tooltip, Button, IconButton } from "@material-ui/core";

const Syllabus = () => {
  return (
    <div className={styles.syllabusContainer}>
      <div className={styles.topbar}>
        <Tooltip placement="top" title="Add">
          <IconButton onClick={null}>Hello</IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default Syllabus;
