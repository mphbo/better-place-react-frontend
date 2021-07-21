import { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileForm from "./ProfileForm";
import EditForm from "./EditForm";
import { motion } from "framer-motion";
import { AccountContext } from "./accountContext";
import axios from "axios";

const BoxContainer = styled.div`
  width: 500px;
  height: 850px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-right: 5em;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -400px;
  left: -350px;
  transform: rotate(60deg);
  background: rgb(26, 188, 156);
  background: linear-gradient(
    90deg,
    rgba(26, 188, 156, 1) 20%,
    rgba(0, 153, 255, 1) 98%
  );
  z-index: 10;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const HeaderPicture = styled.img`
  display: inline;
  /* margin: 0 auto; */
  border-radius: 50%;
  width: 175px;
  height: 175px;
  margin-right: 140px;
  /* margin-left: 20px; */
  margin-top: 10px;
  margin-bottom: 40px;
`;

const HeaderEditPicture = styled.img`
  display: inline;
  /* margin: 0 auto; */
  border-radius: 50%;
  width: 175px;
  height: 175px;
  margin-right: 140px;
  /* margin-left: 20px; */
  margin-top: 10px;
  margin-bottom: 35px;
`;



const InnerContainer = styled.div`
  width: 120%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
  margin-top: -12px;
`;

const backdropVariants = {
  expanded: {
    width: "270%",
    height: "1350px",
    borderRadius: "20%",
    tranform: "rotate(60deg)",
    zIndex: 10,
  },
  collapsed: {
    width: "160%",
    height: "520px",
    borderRadius: "50%",
    tranform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

const ProfileBox = ({ token, setToken, opportunities, city }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");
  const [userPicture, setUserPicture] = useState({});

  useEffect(() => {
    axios
      .get(`/api/user/${token.email}`) //REMEBER TO CHANGE TO :id
      .then((data) => {
        setUserPicture(data.data.users[0].picture_url);
      })
      .catch((e) => {
        console.log("axiosError:", e);
      });
  }, [token.email]);

  const playExpandedAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandedAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 600);
  };
  const switchToSignin = () => {
    playExpandedAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 600);
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContext.Provider value={contextValue}>
      <BoxContainer>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          {active === "signin" && (
            <HeaderContainer>
              <HeaderText>
                <HeaderPicture src={userPicture} height={250} onError={(e)=>{e.target.onerror = null; e.target.src='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'}}/>
              </HeaderText>
            </HeaderContainer>
          )}
          {active === "signup" && (
            <HeaderContainer>
              <HeaderText>
                <HeaderEditPicture src={userPicture} height={250} onError={(e)=>{e.target.onerror = null; e.target.src='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'}} />
              </HeaderText>
            </HeaderContainer>
          )}
        </TopContainer>
        <InnerContainer>
          {active === "signin" && <ProfileForm  city={city} token={token} setToken={setToken} opportunities={opportunities} />}
          {active === "signup" && <EditForm token={token} setToken={setToken} />}
        </InnerContainer>
      </BoxContainer>
    </AccountContext.Provider>
  );
};

export default ProfileBox;
