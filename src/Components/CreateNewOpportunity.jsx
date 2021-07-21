import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { MenuItem } from "@material-ui/core";
import { FormControl, Paper } from "@material-ui/core";
import { getCoords } from "../helpers/location-helpers";
import axios from "axios";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    // display: 'block'
  },
  dropdown: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
  },
});

const CreateNewOpportunity = ({
  opportunities,
  setOpportunities,
  onSave,
  location,
  handleClose,
  setCategories,
  categories,
  host_id,
  setRows,
  rows
}) => {
  const classes = useStyles();
  const [users, setUsers] = useState({});
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [needDate, setNeedDate] = useState("2021-07-17");
  const [needDateError, setNeedDateError] = useState(false);
  const [timeCommitment, setTimeCommitment] = useState("");
  const [timeCommitmentError, setTimeCommitmentError] = useState(false);
  const [volunteersNeeded, setVolunteersNeeded] = useState(1);
  const [volunteersNeededError, setVolunteersNeededError] = useState(false);

  useEffect(() => {
    axios
      .get("/api/categories")
      .then((data) => {
        setCategories(data.data.categories);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [setCategories]);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((data) => {
        setUsers(data.data.users);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setTitleError(false);
    setDescriptionError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (description === "") {
      setDescriptionError(true);
    }
    if (category === "") {
      setCategoryError(true);
    }
    if (needDate === null) {
      setNeedDateError(true);
    }
    if (timeCommitment === null) {
      setTimeCommitmentError(true);
    }
    if (volunteersNeeded === null) {
      setVolunteersNeededError(true);
    }

    if (
      !(
        title &&
        description &&
        category &&
        needDate &&
        timeCommitment &&
        volunteersNeeded
      )
    ) {
      return;
    }
    console.log("users: ", users, "host: ", host_id);
    const findUser = users.find(
      (user) => user.email.toUpperCase() === host_id.email.toUpperCase()
    );

    const fullAddress = `${address}, ${city}`;
    getCoords(fullAddress).then((coords) => {
      const saveData = {
        host_id: findUser.id,
        name: title,
        number_of_volunteers_needed: volunteersNeeded,
        number_of_volunteers_added: 0,
        location: location,
        date: needDate,
        time_commitment: timeCommitment,
        category_id: category,
        description: description,
        lat: coords.lat,
        lng: coords.lng,
        avatar: host_id.picture_url
      };


      onSave(saveData);
      setOpportunities((prev) => [saveData, ...prev]);
      return coords
    })
    .then((coords) => {

    })
    
  };

  // (host_id , name , number_of_volunteers_needed, location, date, time_commitment, category_id)
  return (
    <Paper
      style={{
        width: "100%",
        margin: "0 auto",
        padding: "2%",
        paddingTop: "0%",
      }}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <FormControl
          style={{ width: "100%", paddingLeft: 10, paddingRight: 10 }}
        >
          <Grid item xs={6}>
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              className={classes.field}
              label="Title"
              variant="outlined"
              fullWidth
              required
              helperText="Give your need a short title."
              error={titleError}
              value={title}
            />
          </Grid>
          <Grid>
            <TextField
              onChange={(e) => setDescription(e.target.value)}
              className={classes.field}
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              required
              helperText="Provide a short description of your need."
              error={descriptionError}
              value={description}
            />
          </Grid>

          <Grid item>
            <TextField
              onChange={(e) => setAddress(e.target.value)}
              className={classes.field}
              label="Street Address"
              variant="outlined"
              fullWidth
              rows={4}
              required
              error={descriptionError}
              value={address}
            />
          </Grid>
          <Grid item>
            <TextField
              onChange={(e) => setCity(e.target.value)}
              className={classes.field}
              label="City"
              variant="outlined"
              fullWidth
              required
              error={titleError}
              value={city}
            />
          </Grid>
          <TextField
            select
            required
            onChange={(e) => setCategory(e.target.value)}
            className={classes.dropdown}
            label="Category"
            name="Category"
            value={category}
            error={categoryError}
          >
            {categories &&
              categories.map((category) => {
                return (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                );
              })}
          </TextField>

          <TextField
            select
            required
            className={classes.dropdown}
            onChange={(e) => setTimeCommitment(e.target.value)}
            label="Time Commitment"
            name="Time-commitment"
            error={timeCommitmentError}
            value={timeCommitment}
          >
            <MenuItem value="Quick (minutes)">Quick (minutes)</MenuItem>
            <MenuItem value="Short (3 hours or less)">
              Short (3 hours or less)
            </MenuItem>
            <MenuItem value="Medium (8 hours or less)">
              Medium (8 hours or less)
            </MenuItem>
            <MenuItem value="Long (Full day)">Long (Full day)</MenuItem>
            <MenuItem value="Extra Long (Muliple days)">
              Extra Long (Muliple days)
            </MenuItem>
          </TextField>

          <TextField
            type="number"
            required
            onChange={(e) => setVolunteersNeeded(e.target.value)}
            className={classes.dropdown}
            label="# of Volunteers Required"
            name="# of Volunteers Required"
            error={volunteersNeededError}
            value={volunteersNeeded}
          ></TextField>

          <TextField
            id="date"
            label="Date of Need"
            type="date"
            required
            onChange={(e) => setNeedDate(e.target.value)}
            className={classes.field}
            InputLabelProps={{
              shrink: true,
            }}
            error={needDateError}
            value={needDate}
          />
          <Grid>
            <Button
              className={classes.button}
              type="submit"
              color="primary"
              variant="contained"
              onClick={handleClose}
              endIcon={<KeyboardArrowRightIcon />}
            >
              Submit
            </Button>
          </Grid>
        </FormControl>
      </form>
    </Paper>
  );
};

export default CreateNewOpportunity;
