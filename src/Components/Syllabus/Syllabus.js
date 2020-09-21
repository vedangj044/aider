import React, { useState } from "react";
import styles from "./Syllabus.module.css";
import {
  Tooltip,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const Syllabus = () => {
  const subjects = [""];
  const branchs = ["CSE", "IT", "EI", "Mech", "Civil"];
  const years = [1, 2, 3, 4];

  const [subject, setSubject] = useState("");
  const [branch, setBranch] = useState();
  const [year, setYear] = useState();

  return (
    <div className={styles.syllabusContainer}>
      <div className={styles.topbar}>
        <Tooltip placement="top" title="Options">
          <IconButton onClick={null}>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </div>

      <div className={styles.innerContainer}>
        <Grid container spacing={4}>
          <Grid item md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="subject">Subject</InputLabel>
              <Select
                className={styles.inputSelect}
                labelId="subject"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                {subjects.map((sub) => (
                  <MenuItem value={sub}>{sub}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="branch">Branch</InputLabel>
              <Select
                className={styles.inputSelect}
                labelId="branch"
                id="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                {branchs.map((br) => (
                  <MenuItem value={br}>{br}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="year">Year</InputLabel>
              <Select
                className={styles.inputSelect}
                labelId="year"
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                {years.map((yr) => (
                  <MenuItem value={yr}>{yr}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <div className={styles.upload}></div>
      </div>
    </div>
  );
};

export default Syllabus;
