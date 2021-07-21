import React, {useState}from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import AddReview from './AddReview';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box'
import {
  BorderReviewSeperator
} from "./common";
import { Marginer } from "./Marginer";


const useStyles = makeStyles((theme) => ({
  root: {
    // display:'flex',
    // justifyContent: 'center',
  
  },
  button: {
    marginLeft: '85px',
    margin: 'auto',
    color: '#716bcc',
    '&:hover': {
      color:'#5ae2b5',
      background: '#f5f6fa'
    },
    
  },
  info: {
    width: '85%',
    marginLeft: 35,
    marginRight: 50
  },
  description: {
    width: '75%',
    marginLeft: 70
  },
  border: {
    width: '100px'
  }
}));



const ReviewMod = ({token, setToken, opportunities, opportunity, city, completedOpportunities})  => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>

      <Button className={classes.button} onClick={handleClickOpen}>
       <AddCircleIcon/> Add Review
      </Button>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <ListItem className={classes.info} key={opportunity.opportunity_id} alignItems="flex-start">
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
                </React.Fragment>
              }
            />
          </ListItem>
          <BorderReviewSeperator />
        {/* <DialogTitle id="form-dialog-title">Add Review</DialogTitle> */}
        <DialogContent>
          <DialogContentText>
            <ListItemText className={classes.description} >Please leave a comment & rating!</ListItemText>
          </DialogContentText>

          <AddReview open={open} setOpen={setOpen} handleClose={handleClose} city={city} token={token} setToken={setToken} opportunity={opportunity} opportunities={opportunities} completedOpportunities={completedOpportunities} />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
      
      </DialogActions> */}
      </Dialog>
    </div>
  );
}

export default ReviewMod