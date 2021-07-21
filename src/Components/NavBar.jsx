import React from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import betterplace from "../resources/better-place.png";
import {
  makeStyles
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AccountBox from "./accountBox/AccountBox";
import ProfileBox from "./profileBox/ProfileBox";
import GeoLocation from "./GeoLocation";




const useStyles = makeStyles({
  root: {
    background:
      "linear-gradient(90deg, rgba(0,153,255,1) 20%, rgba(26,188,156,1)98%)",
  },
  text: {
    color: "#FFFFFF",
  },
  search: {
    width: "500px",
  },
  drawerInside: {
    // width: 600,
    height: 800,
    borderRadius: 25,
    // textTransform: "capitalize",
  },
    drawerProfile: {
    // width: 600,
    height: 850,
    borderRadius: 25,
    // textTransform: "capitalize",
  },
  flex: {
    display: "flex",
  },
  logoutButton: {
    fontSize: 10,
    marginTop: 35,
    marginRight: -20
  },
  navBarProfile: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  currentLocation: {
    marginRight: 50,
    height: 50
  }
});

const NavBar = ({ handleLocation, city, country, token, setToken, setLng, setLat, opportunities }) => {
  const classes = useStyles();

  const [loginPage, setLoginPage] = React.useState({
    right: false,
  });
  const [profilePage, setProfilePage] = React.useState({
    right: false,
  });


  const toggleLogin = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setLoginPage({ ...loginPage, [anchor]: open });
  };

  

  // const checksIfToken = (key) => {
  //   console.log('tokenForCheck:', token)
  //   if (key) {
  //     return true
  //   }
  //   if (!key) {
  //     return false
  //   }
  // }
  

  const toggleProfile = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setProfilePage({ ...profilePage, [anchor]: open });
  };



  return (
    <div>
      <AppBar className={classes.root}>
        <ToolBar>
          <Typography variant="h6">
            <img src={betterplace} alt="betterplace" />
          </Typography>
          {/* GEO LOCATION */}
          <GeoLocation
            className={classes.currentLocation}
            handleLocation={handleLocation}
            city={city}
            country={country}
            setLat={setLat}
            setLng={setLng}
          />
          <Grid container justify="flex-end" justify-content="space-between">
 
            {/* ACCOUNT BOX ATTEMPT */}
            {token && (
              ["right"].map((anchor) => (
                <React.Fragment key={anchor}>

                  <Button onClick={toggleProfile(anchor, true)}><img className={classes.navBarProfile} src={token.picture_url} alt="ProfilePic" onError={(e)=>{e.target.onerror = null; e.target.src='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'}} /></Button>





                  {/* <Button onClick={toggleProfile(anchor, true)}><img className={classes.navBarProfile} src={token.picture_url} alt="ProfilePic" /></Button> */}

                  <Drawer
                    classes={{ paper: classes.drawerProfile }}
                    anchor={anchor}
                    open={profilePage[anchor]}
                    onClose={toggleProfile(anchor, false)}
                  >
                    <ProfileBox city={city} token={token} setToken={setToken} opportunities={opportunities}/>
                  </Drawer>
                </React.Fragment>
              ))
            )}
            
          
            {["right"].map((anchor) => (
              <React.Fragment key={anchor}>
                {!token && (
                  <>
                  <Button onClick={toggleLogin(anchor, true)}>Login</Button>
                  
                 </>

                )}
                {token && (
                  <div className={classes.flex}>
                    <p>{sessionStorage.getItem('token')}</p>
                    <Button
                      className={classes.logoutButton}
                      onClick={() => setToken("")}
                    >
                      Logout
                    </Button>
                  </div>
                )}
                <Drawer
                  classes={{ paper: classes.drawerInside }}
                  anchor={anchor}
                  open={loginPage[anchor]}
                  onClose={toggleLogin(anchor, false)}
                  // onSubmit={() => handleLogin()}
                  onSubmit={toggleLogin(anchor, !token)}
                  
                  // onClick={() => handleSubmit(anchor, token)}
                >
                  <AccountBox setToken={setToken} token={token} setLoginPage={setLoginPage} />

                </Drawer>
              </React.Fragment>
            ))}
            
          </Grid>
        </ToolBar>
      </AppBar>
    </div>
  );
};

export default NavBar;
