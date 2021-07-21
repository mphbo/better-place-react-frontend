import {
  BoxContainer,
  MutedLink,
  SmallText,
  EditLink,
  TitleText,
  NameText,
  BioText,
  CenterIcon,
  BorderSeperator,
  ProfileInfoContainer
} from "./common";
import { Marginer } from "./Marginer";
import { AccountContext } from "./accountContext";
import { useContext } from "react";
import AlignItemsList from "./AlignedItemList";
import MailIcon from "@material-ui/icons/Mail";
import CallIcon from "@material-ui/icons/Call";
import HomeIcon from "@material-ui/icons/Home";
import AddReview from "./AddReview"

const ProfileForm = ({ token, setToken, opportunities, city }) => {
  const { switchToSignup } = useContext(AccountContext);


  return (
    <>
      <BoxContainer>
        <ProfileInfoContainer>
          <NameText>{token.name}</NameText>
          <BorderSeperator />

          <BioText>{token.bio}</BioText>
          <BorderSeperator />
          <CenterIcon>
            <MailIcon />
          </CenterIcon>
          <SmallText>{token.email}</SmallText>
          <CenterIcon>
            <CallIcon />
          </CenterIcon>
          <SmallText>{token.phone_number}</SmallText>
          <CenterIcon>
            <HomeIcon />
          </CenterIcon>
          <SmallText>{token.address}</SmallText>
        </ProfileInfoContainer>
        <Marginer direction="vertical" margin={10} />
        <MutedLink href="#"></MutedLink>
        <Marginer direction="vertical" margin="1.6em" />
        <Marginer direction="vertical" margin="1.6em" />
      </BoxContainer>

      <TitleText>Completed Volunteer Opportunities</TitleText>
      <Marginer direction="vertical" margin={5} />
      <EditLink href="#" onClick={switchToSignup}>
        Edit Profile
        <Marginer direction="vertical" margin={10} />
      </EditLink>
      <AlignItemsList city={city} token={token} setToken={setToken} opportunities={opportunities} />
    </>
  );
};

export default ProfileForm;
