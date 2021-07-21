import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { getCompletedOpportunities } from "../../helpers/filters-and-sorters";
import AddReview from "./AddReview"
import ReviewMod from "./ReviewMod"

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "86.5%",
    width: "86.5%",

    maxWidth: "60ch",
    // minHeight: "29%",
    // maxHeight: "29%",
    maxHeight: "260px",
    overflow: "auto",
    marginTop: "-8px",

    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  item: {
    border: '1px solid transparent',
    '&:hover': {
      background: '#f5f6fa',
      borderBottom: '1px solid #5ae2b5',
      borderTop: '1px solid #5ae2b5',
      borderLeft: '1px solid #5ae2b5'
    }
  },
  reviewMod: {
    maxHeight: 100
  }
}));

export default function AlignItemsList({ token, setToken, opportunities, city, opportunityId }) {
  const classes = useStyles();
  const [completedOpportunities, setCompletedOpportunities] = useState([]);
  useEffect(() => {
    axios
      .put(`/api/users_opportunities/${token.email}`)
      .then((data) => {
        setCompletedOpportunities(getCompletedOpportunities(data.data.opportunities));
        console.log('completedOpps:', completedOpportunities)
      })
      .catch((e) => {
        console.log("axiosError:", e);
      });
  }, [token]);
  
  return (
    <>
      <List className={classes.root}>
        {completedOpportunities.map((opportunity) => (
          <ListItem className={classes.item} key={opportunity.opportunity_id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={opportunity.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={opportunity.opportunity_name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {opportunity.username}
                  </Typography>
                  {` — ${opportunity.description}`}
                  <ReviewMod className={classes.reviewMod} city={city} token={token} setToken={setToken} opportunity={opportunity} completedOpportunities={completedOpportunities} opportunities={opportunities}/>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
