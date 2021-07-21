import React, { useEffect, useState } from "react";
import "./CategoryList.scss";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BadgeAvatars from "./BadgeAvatars";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "@material-ui/icons/Close";
// import "emoji-mart/css/emoji-mart.css";
// import { Picker } from "emoji-mart";
import GifBox from "./GifBox";

import ScrollToBottom, {
  useScrollToBottom,
  useSticky,
} from "react-scroll-to-bottom";

import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import { getMinutes } from "../helpers/basic-helpers";
import {
  getUsersFromMessages,
  getConversation,
  getMessagesFromAuthor,
} from "../helpers/filters-and-sorters";
import axios from "axios";
import Popper from "@material-ui/core/Popper";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import './Chat.scss'
// import ChatBubble from "@bit/mui-org.material-ui-icons.chat-bubble";

const useStyles = makeStyles({
  gif: {
    width: 500,
    zIndex: 2000,
  },


  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
  userMessage: {
    textAlign: "rig",
  },
  send: {
    display: "inline-block",
    float: "right",
    maxWidth: "285px",
    alignSelf: "flex-end",
    wordWrap: "break-word",
    marginBottom: "0px",
    lineHeight: "24px",
    position: "relative",
    padding: "10px 20px",
    borderRadius: "25px",
    color: "white",
    // background: '#0B93F6',
    background:
      "linear-gradient(90deg, rgba(26,188,156,1) 20%, rgba(0,153,255,1)98%)",
    textAlign: "left",
    marginLeft: "120px",
    "&::before": {
      right: "-7px",
      width: "20px",
      backgroundColor: "#0B93F6",
      borderBottomLeftRadius: "16px 14px",
    },
    "&::after": {
      right: "-26px",
      width: "26px",
      backgroundColor: "white",
      borderBottomLeftRadius: "10px",
    },
  },
  receive: {
    maxWidth: "285px",
    display: "inline-block",

    wordWrap: "break-word",
    marginBottom: "0px",
    lineHeight: "24px",
    position: "relative",
    padding: "10px 20px",
    borderRadius: "25px",
    color: "black",
    // background: '#E5E5EA',
    background:
      "linear-gradient(90deg, rgba(255,204,121,1) 23%, rgba(144,144,245,1) 100%)",
    "&::before": {
      right: "-7px",
      width: "20px",
      backgroundColor: "#E5E5EA",
      borderBottomLeftRadius: "16px 14px",
    },
    "&::after": {
      right: "-26px",
      width: "26px",
      backgroundColor: "#E5E5EA",
      borderBottomLeftRadius: "10px",
    },
  },
  paperRoot: {
    background:
      "linear-gradient(90deg, rgba(0,153,255,1) 20%, rgba(26,188,156,1)98%)",
    color: "white",
  },
  headerText: {
    color: "white",
    paddingLeft: "100px",
    paddingTop: "10px",
  },
  closeButton: {
    paddingRight: "15px",
  },
});

const fakeMessages = [
  {
    id: 1,
    author: 2,
    isPrimary: false,
    message: "Hey I seen your post and was wondering what ",
    time: "2021-07-08 14:08:25-07",
  },
  {
    id: 2,
    author: 2,
    isPrimary: false,
    message: "Your opportunity sounds really cool.",
    time: "2021-07-08 00:22:25-07",
  },
  {
    id: 2,
    author: 2,
    isPrimary: false,
    message: "Thank you!",
    time: "2021-07-08 11:33:25-07",
  },
];

const Chat = ({
  users,
  messageList,
  setMessage,
  sendMessage,
  message,
  token,
  setMessageList,
  click,
  setUnseenStatus,
  unseenStatus,
  receiver,
  setReceiver,
}) => {
  const classes = useStyles();
  // console.log("OPP USER IN CHAT-----", users)

  const scrollToBottom = useScrollToBottom();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("I PRESSED ENTER");
      sendMessage(receiver);
    }
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [time, setTime] = useState(new Date().getTime());
  const [loop, setLoop] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      let t = new Date();
      let ms = t.getTime();
      setTime((prev) => prev + 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const handleClickPopper = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  // const [currentUsers, setCurrentUsers] = useState([]);

  // const [conversation, setConversation] = useState(false);

  useEffect(() => {
    // setCurrentUsers(getUsersFromMessages(filterMessages(messageList, token.id)), users, token.id)
  }, [messageList, token.id, users]);

  // useEffect(() => {
  // setMessageList()
  // })
  const onReceiverClick = (id) => {
    const arr = [...unseenStatus.sender];
    console.log("sender:", unseenStatus.sender);
    const newArr = arr.filter((item) => {
      return item !== id;
    });
    console.log("sender Array", newArr);

    if (newArr.length < 1) {
      setUnseenStatus((prev) => ({
        ...prev,
        unseenMessagesExist: false,
        sender: newArr,
      }));
      console.log("YOU CANT SEE ME-------", unseenStatus);
    } else {
      setUnseenStatus((prev) => ({
        ...prev,
        unseenMessagesExist: true,
        sender: newArr,
      }));
    }
    setReceiver((prev) => id);

    setMessageList((prev) => [...getMessagesFromAuthor(messageList, id)]);
    axios.put(`/api/messages/${id}`, { id: token.id });
  };

  const usersInChat = getUsersFromMessages(
    messageList,
    users,
    token.id,
    receiver
  ).map((user) => {
    // console.log(user.name)
    // const usersInChat = users.map((user) => {
    // changed usersInChat from users because  conflict with users prop.
    return (
      <ListItem onClick={() => onReceiverClick(user.id)} button key={user.id}>
        <ListItemIcon>
          {unseenStatus.sender.includes(user.id) ? (
            <>
              <BadgeAvatars />
              <Avatar
                alt={user.name}
                src={user.picture_url}
                style={{ border: "3px solid #e08079" }}
              />
            </>
          ) : (
            <Avatar alt={user.name} src={user.picture_url} />
          )}
        </ListItemIcon>
        <ListItemText primary={user.name}></ListItemText>
      </ListItem>
    );
  });

  // const messages = messageList.map((message) => {
  const messages = getConversation(messageList, token.id, receiver).map(
    (message) => {
      return (
        <ListItem key={users.id}>
          <Grid container>
            <Grid item xs={12}>
              <ListItemText
                className={
                  token.id === message.author ? classes.send : classes.receive
                }
                align={token.id === message.author ? "right" : "left"}
                primary={message.message}
              ></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText
                className={
                  token.id === message.author
                    ? classes.dateSend
                    : classes.dateReceive
                }
                align={token.id === message.author ? "right" : "left"}
                secondary={`${getMinutes(message.time, time)}`}
              ></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
      );
    }
  );

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paperRoot} onClick={click}>
            <Grid container>
              <Grid item xs={6}>
                <Typography square variant="h6" className={classes.headerText}>
                  Chat
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                container
                alignItems="flex-end"
                direction="row-reverse"
                className={classes.closeButton}
              >
                <CloseIcon />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem key={token.id}>
              <ListItemIcon>
                <Avatar
                  alt={token.name}
                  src={token.picture_url}
                  variant="rounded"
                  style={{
                    border: "5px solid #1abc9c",
                    position: "fixed",
                    top: "20px",
                    height: "70px",
                    width: "70px",
                  }}
                />
              </ListItemIcon>
              {/* <ListItemText primary={token.name}></ListItemText> */}
            </ListItem>
          </List>

          <Divider style={{ marginTop: "35px" }} />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          {/* <Picker/ > */}
          {usersInChat}
          <Divider />
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageArea}>{receiver && messages}</List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={1}>
              <div>
                <Popper
                  open={open}
                  anchorEl={anchorEl}
                  placement={placement}
                  transition
                  className={classes.gif}
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps}  timeout={350}>
                        <GifBox receiver={receiver} setMessage={setMessage} sendMessage={sendMessage} message={message} />
                    </Fade>
                  )}
                </Popper>
                <Grid container justifyContent="center">
                  <Grid item>
                    {/* <Button onClick={handleClickPopper("top-end")}>gifs</Button> */}
                  </Grid>
                </Grid>
              </div>
            </Grid>
            
                {/* <Grid item xs={1}>
                  <Popper
                    open={open}
                    anchorEl={anchorEl}
                    placement={placement}
                    transition
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                          <Picker />
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </Grid> */}

            <Grid item xs={10}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
                form="text-form"
                value={message}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setMessage((prev) => e.target.value);
                }}
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add">
                {/* <IconButton form="text-form" type="submit"  > */}
                <SendIcon
                  onClick={() => {
                    message && sendMessage(receiver);
                  }}
                />
                {/* </IconButton> */}
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
