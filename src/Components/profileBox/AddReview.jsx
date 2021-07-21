import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import GradeIcon from '@material-ui/icons/Grade';
import Rating from '@material-ui/lab/Rating';
import axios from "axios"
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";



const useStyles = makeStyles({
  root: {
    // display: 'flex',
  },
  field: {
    width: '75%',
    marginLeft: 70,
    marginTop: 5,
    marginBottom: 5,
    maxLength:"225"
  },
  rating: {
    marginTop: 25,
    marginLeft: 200,
  },
  submit: {
    margin: 10,
    marginTop: 15,

    color: '#716bcc',
    '&:hover': {
      color:'#5ae2b5',
      background: '#fff'
    }
  },
  button: {
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'center'

  }
})



const AddReview = ({token, setToken, opportunities, opportunity, city, completedOpportunities, open, setOpen, handleClose}) => {
  const classes = useStyles();

const [userFeedback, setUserFeedback] = useState("")
const [rating, setRating] = useState("Rating")
const [reviews, setReviews] = useState([]);



const handleSubmitReview = (e) => {
  e.preventDefault();
  const userSave = (data) => {
    axios
      .post(`/api/reviews`, data)
      .then((data) => {
      })
      .catch((e) => {
        console.log("post error:", e.message);
      });
  };

  const saveData = {
    user_id: token.id,
    opportunity_id: opportunity.opportunity_id,
    user_feedback: userFeedback,
    rating
    
  };
  setOpen(false)
  userSave(saveData);
};


return (
  <div>
    <form action="">
      
            <div>
            <TextField 
              
              onChange={(e) => setUserFeedback(e.target.value)}
              className={classes.field}
              multiline={true}
              rows={4}
              name="Description"
              label="Review"
              placeholder="Please leave your comment here..."
              autoComplete="off"
              variant="outlined"
              // error={titleError}
              value={userFeedback}
              inputProps={{maxLength: 225}}
            />
            </div>

              <div>
                <Rating 
                  className={classes.rating}
                  value={rating} 
                  onChange={(e) => setRating(e.target.value)} 
                  name="size-large" 
                  defaultValue={2} 
                  size="large" 
                />
              </div>


              <div className={classes.button}>
                <Button 
                  className={classes.submit}
                  onClick={handleClose} 
                  color="primary"
                  >Cancel
                </Button>
                
                <Button 
                  className={classes.submit}
                  type="submit" 
                  onClick={handleSubmitReview}
                  color="primary"
                  >Submit
                </Button>
                  </div>
    </form>
  </div>
);



}






export default AddReview