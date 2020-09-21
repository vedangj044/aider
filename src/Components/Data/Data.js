import React, { useState, useContext } from "react";
import styles from "./Data.module.css";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  Tooltip,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Avatar,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import GetAppIcon from "@material-ui/icons/GetApp";
import { AddCircle, SettingsSystemDaydreamTwoTone } from "@material-ui/icons";
import { GlobalContext } from "../../Context/GlobalContext";

const Data = () => {
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [score, setScore] = useState(0);
  const [year, setYear] = useState(2020);
  const [category, setCategory] = useState("");
  const branchs = ["CSE", "IT", "EI", "Mech", "Civil"];

  const { gre, gate, placement } = useContext(GlobalContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.dataContainer}>
      <div className={styles.topbar}>
        <Tooltip placement="top" title="Import Data">
          <Button className={styles.importBtn}>
            Import <GetAppIcon fontSize="small" />
          </Button>
        </Tooltip>
        <Tooltip placement="top" title="Add Data">
          <IconButton onClick={() => setOpen(true)}>
            <AddCircle />
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <AppBar position="static" className={styles.appbar} color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full-width-tabs"
          >
            <Tab label="GRE" {...a11yProps(0)} />
            <Tab label="GATE" {...a11yProps(1)} />
            <Tab label="Placement" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis="x"
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
            <div className={styles.gre}>
              {gre.map((item) => {
                return (
                  <Paper className={styles.card}>
                    <div className={styles.nameAvatar}>
                      <Avatar>{item.name.slice(0, 2)}</Avatar>
                      <div className={styles.name}>
                        <h5>{item.name}</h5>
                        <p>
                          {item.year}, {item.branch}
                        </p>
                      </div>
                    </div>

                    <div className={styles.score}>
                      <p>Score</p>
                      <h2>{item.score}</h2>
                    </div>
                  </Paper>
                );
              })}
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className={styles.gate}>
              {gate.map((item) => {
                return (
                  <Paper className={styles.card}>
                    <div className={styles.nameAvatar}>
                      <Avatar>{item.name.slice(0, 2)}</Avatar>
                      <div className={styles.name}>
                        <h5>{item.name}</h5>
                        <p>
                          {item.year}, {item.branch}
                        </p>
                      </div>
                    </div>

                    <div className={styles.score}>
                      <p>Score</p>
                      <h2>{item.score}</h2>
                    </div>
                  </Paper>
                );
              })}
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className={styles.place}>
              {placement.map((item) => (
                <Paper className={styles.card}>
                  <div className={styles.nameAvatar}>
                    <Avatar>{item.name.slice(0, 2)}</Avatar>
                    <div className={styles.name}>
                      <h5>{item.name}</h5>
                      <p>
                        {item.year}, {item.branch}
                      </p>
                    </div>
                  </div>

                  <div className={styles.score}>
                    <p>LPA</p>
                    <h2>{item.score}</h2>
                  </div>
                </Paper>
              ))}
            </div>
          </TabPanel>
        </SwipeableViews>
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className={styles.dialogTitle} id="alert-dialog-title">
            Add Data
          </DialogTitle>
          <DialogContent className={styles.content}>
            <form className={styles.form}>
              <TextField
                autoFocus
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
                className={styles.inputField}
                label="Name"
              />
              <TextField
                variant="outlined"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                type="number"
                required
                className={styles.inputField}
                label="Year"
              />
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
                    <MenuItem key={br} value={br}>
                      {br}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={styles.formControl}>
                <InputLabel id="category">Category</InputLabel>
                <Select
                  className={styles.inputSelect}
                  labelId="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value={"gre"}>GRE</MenuItem>
                  <MenuItem value={"gate"}>GATE</MenuItem>
                  <MenuItem value={"placement"}>Placement</MenuItem>
                </Select>
              </FormControl>
              <TextField
                variant="outlined"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                type="number"
                required
                className={styles.inputField}
                label="Score"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleClose();
              }}
              color="primary"
              autoFocus
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Data;
