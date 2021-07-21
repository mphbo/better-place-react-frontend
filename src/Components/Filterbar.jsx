import React, { useState, useEffect } from "react";
import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import "./NewButton.scss";
import {sortRowsByDate, sortRowsByTimeCommitment, sortRowsByDistance} from '../helpers/filters-and-sorters'
import ExploreIcon from '@material-ui/icons/Explore';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 200
  },
  paper: {
    marginBottom: "5px",
    width: "100%",
  },
  map: {
    marginBottom: '16px',
    marginLeft: '50px'
  }
}));

const Filterbar = ({ opportunities, handleClickOpen, host_id, rows, setRows, setMap, map }) => {
  const classes = useStyles();
  const [filter, setFilter] = useState("");

  const handleChange = () => {
    switch (filter) {
      case "Date: soonest first":
        setRows((prev) => [ ...sortRowsByDate(prev, true)])
        console.log('firstFilterWorking:')
        // setRows('error')
        break;
      case "Date: latest first":
        setRows((prev) => [ ...sortRowsByDate(prev)])
        console.log("latest first")
        break;
      case "Time Commitment: shortest first":
        setRows((prev) => [ ...sortRowsByTimeCommitment(prev)])
        break;
      case "Time Commitment: longest first":
        setRows((prev) => [ ...sortRowsByTimeCommitment(prev, true)])
        break;
      case "Distance: nearest first":
        setRows((prev) => [ ...sortRowsByDistance(prev, true)])
        break;
      // case "Host rating: highest first":
      //   break;
      default:
        break;
    }
  };
  
  
  useEffect(() => {
    handleChange();
  }, [filter])

  
  // const handleChange = (event) => {
  //   setFilter(event.target.value);
    
  //   const sortObject = {
  //     'Date: latest first': function1,
  //     'Time Commitment: shortest first': function2
  //   }

  // }

  return (
    <Paper elevation={0} className={classes.paper}>
      <div className="row">
        <div className="col-6 text-left align-self-end">
        <Button
          // variant="contained"
          color="primary"
          className={classes.map}
          endIcon={<RoomIcon/>}
          style={{paddingLeft: "20px"}}
          onClick={() => {
            console.log(map)
            setMap(!map)}}
          >
          {map ? "Map View" : "List View"}
        </Button>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-5 text-right align-self-center new-button">
              <div className="addNewButton">
                {host_id && (
                  <Button
                    // variant="contained"

                    onClick={handleClickOpen}
                    color="primary"
                    endIcon={<Icon>add_circle</Icon>}
                  >
                    Add new
                  </Button>
                )}
              </div>
            </div>
            <div className="col-7 text-left align-self-center">
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Sort
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                  label="Sort"
                  autoWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Date: soonest first"}>
                    Date: Earliest
                  </MenuItem>
                  <MenuItem value={"Date: latest first"}>
                    Date: Latest
                  </MenuItem>
                  <MenuItem value={"Time Commitment: shortest first"}>
                    Time: Shortest
                  </MenuItem>
                  <MenuItem value={"Time Commitment: longest first"}>
                    Time: Longest
                  </MenuItem>
                  <MenuItem value={"Distance: nearest first"}>
                    Distance: Nearest
                  </MenuItem>
                  {/* <MenuItem value={"Host rating: highest first"}>
                    Host rating: highest first
                  </MenuItem> */}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default Filterbar;
