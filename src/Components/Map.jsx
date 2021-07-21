import React, { Component, useState } from "react";
import GoogleMapReact from "google-map-react";
import RoomIcon from "@material-ui/icons/Room";
import { Popover, Button } from "antd";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { Chat, PersonPinCircle } from "@material-ui/icons";
import { dateFormatter } from "../helpers/basic-helpers";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import { Rate } from 'antd';
import "./Map.scss";
// import Popover from '@material-ui/core/Popover';
import {
  addOpportunity,
  removeOpportunity,
  getAverageRating
} from "../helpers/filters-and-sorters";

const useStyles = makeStyles({
  card: {
    borderRadius: "50%",
    color: "red",
    minWidth: "205px",
    maxWidth: '305px'
    
  },
  chat: {
    textAlign: "center",
    // fontSize: "25px"
    marginBottom: "4px",
    marginRight: "10px"
  },
  content: {
    textAlign: 'center'
  },
  description: {
    textAlign: 'center',
  },
  stars: {
    fontSize: '15px',
    marginBottom: '10px'
  },
  pin: {
    color: 'indigo'
  },
  homePin: {
    fontSize: '50px'
  } 
});

export default function Map({
  latitude,
  longitude,
  rows,
  handleClickPopper,
  setReceiver,
  setRows,
  token,
  reviews
}) {
  const classes = useStyles();
  const defaultProps = {
    zoom: 11,
    resetBoundsOnResize: true,
  };

  const handleChatButton = (id) => {
    handleClickPopper();
    setReceiver(id);
  };

  const [state, setState] = useState({
    notVolunteering: false,
    volunteering: true,
  });

  const addVolunteer = (opportunityId) => {
    axios.post(`/api/users_opportunities`, {
      user_id: token.id,
      opportunity_id: opportunityId,
    });
  };

  const removeVolunteer = (opportunityId) => {
    axios.delete(`/api/users_opportunities/${opportunityId}`, {
      data: { user_id: token.id },
    });
  };

  const handleCheckbox = (event) => {
    console.log("event.target.id", event.target.id);
    setState({ ...state, [event.target.name]: event.target.checked });
    const checked = event.target.checked;
    const oppId = event.target.id;

    if (checked) {
      const newRows = addOpportunity(rows, oppId);
      setRows((prev) => [...newRows]);
      addVolunteer(oppId);
    }

    if (!checked) {
      const newRows = removeOpportunity(rows, oppId);
      setRows((prev) => [...newRows]);
      removeVolunteer(oppId);
    }
  };

  const pins = rows.map((pin) => {
    const text = (
      <div style={{ display: "flex", flexDirection: "row", flexWrap:"wrap", alignItems: "flex-end", fontWeight: "bold", width:"250px" }}>
          <div className="col-2">
          <Avatar alt={pin.name} src={pin.avatar} />
          </div>
          <div className="col-10 text-center">
        <span style={{ display: "inline",marginLeft:"10px", fontWeight: "bold" }}>
          {pin.name}
        </span>
        </div>
      </div>
    );
    const content = (
      <div>
        <div>
          {token && <Chat color="primary" className={classes.chat} onClick={() => handleChatButton(pin.host_id)} />}
          {token && pin.selected && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.volunteering}
                  onChange={handleCheckbox}
                  name="checkedG"
                  id={pin.id}
                  color="primary"
                />
              }
              label="Volunteering"
            />
          )}
          {token && !pin.selected && (
            <FormControlLabel
            control={
                <Checkbox
        checked={state.notVolunteering}
                  onChange={handleCheckbox}
                  name="checkedG"
                  id={pin.id}
                  color="primary"
                />
              }
              label="Volunteer"
            />
          )}
        </div>
        <div className={classes.content}>
          <Rate disabled className={classes.stars} defaultValue={getAverageRating(reviews, pin.host_id)} />
          <p><strong>Category</strong> : {pin.category_name}</p>
          <p><strong>Commitment</strong> : {pin.time_commitment}</p>
          <p><strong>Date</strong> : {dateFormatter(pin.date)}</p>
          <p className={classes.description}>{pin.description}</p>
        </div>      
      </div>
    );
    return (
      <Popover
        placement="topLeft"
        lat={pin.lat}
        lng={pin.lng}
        title={text}
        content={content}
        trigger="click"
        overlayClassName={classes.card}
      >
        <IconButton style={{ transform: "translate(-50%, -100%)" }}>
          <RoomIcon
            style={
              pin.category_name === 'Home Repair' ? {color: 'rgba(26,188,156,1)'} 
            : pin.category_name === 'Physical' ? {color: '#0099FF'} 
            : pin.category_name === 'Family' ? {color: '#FF8484'} 
            : pin.category_name === 'Chores' ? {color: '#D00000'}
            : pin.category_name === 'Education' ? {color: '#340068'} 
            : pin.category_name === 'Pet Care' ? {color: '#254D32'} 
            : pin.category_name === 'Community' ? {color: '#42F2F7'}
            : pin.category_name === 'Other' ? {color: '#9B287B'}
            : {color: 'black'}
            }

            fontSize="large"
            // lat={pin.lat}
            // lng={pin.lng}
            text={pin.description}
          />
        </IconButton>
      </Popover>
    );
  });

  const center = { lat: Number(latitude), lng: Number(longitude) };
  return (
    // Important! Always set the container height explicitly

    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
      defaultCenter={center}
      defaultZoom={defaultProps.zoom}
    >
      <PersonPinCircle style={{ transform: "translate(-50%, -100%)" }} className={classes.homePin} lat={latitude} lng={longitude} />
      {pins}
    </GoogleMapReact>
  );
}
