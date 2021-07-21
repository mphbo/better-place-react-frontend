import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#e08079',
    color: '#e08079',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(2.8)', //  original .8
      opacity: 1,
    },
    '100%': {
      transform: 'scale(5.4)', //  original 2.4
      opacity: 0,
    },
  },
}))(Badge);


const useStylesBadge = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      marginLeft: '-8px',
    },
  },
}));

export default function BadgeAvatars() {
  const classes = useStylesBadge();
    // console.log('BADGE USERS----', users)
  return (
    <div className={classes.root}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
          
        }}
        variant="dot"
      >
        {/* <Avatar alt={users.name} src={users.picture_url} /> */}
      </StyledBadge>
    </div>
  );
}
