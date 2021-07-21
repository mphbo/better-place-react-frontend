import React, { useState, useEffect} from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import axios from 'axios';
import Review from './Review';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Divider } from '@material-ui/core';



const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }),
);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});


export default function Reviews( {reviews, host_id, handleClose, open} ) {
  const classes = useStyles();

  // const [ userReviews, setUserReviews ] = useState([])
 


  // useEffect(() => {
  //   axios.get(`/api/review/${host_id}`)
  //   .then((data) => {
  //     const reviewArr = data.data.reviews
  //     setUserReviews([...reviewArr])
  //   })
  //   .catch((e) => (console.log(e.message)))
  // }, [host_id])

  // let userReviews = [];

  // useEffect(() => {
    
    const userReviews = reviews.filter((review) => {
      return review.user_id === host_id;
    
    })


  // }, [reviews])



  return (
    <Dialog
        // fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{`${userReviews.length > 0 ? "Reviews for " + userReviews[0].name : 'No Reviews Yet' }`}</DialogTitle>
        <List className={classes.root} alignItems="center" >
          {/* <Divider variant="inset" component="li" /> */}

            {userReviews.map((review, i) => { 
              return <><Review key={ review.id } feedback={review.user_feedback} rating={review.rating} user={review.name} avatar={review.avatar}/>{userReviews[i + 1] && <Divider variant="inset"/>}</>})}
        </List>
      </ Dialog>

  );
}