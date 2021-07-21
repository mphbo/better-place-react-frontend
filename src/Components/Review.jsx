import React  from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';





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


export default function Review({ feedback, rating, user, avatar }) {
  const classes = useStyles();

  return (
    // <Paper elevation={3} >
      <ListItem alignItems="flex-end">
        <ListItemAvatar>
          <Avatar alt={user} src={avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={<Rating name="read-only" value={rating} readOnly  />}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
                >
                {user}
              </Typography>
              {` - ${feedback}`}
            </React.Fragment>
          }
          />
      </ListItem>
    // </Paper>
  );
}