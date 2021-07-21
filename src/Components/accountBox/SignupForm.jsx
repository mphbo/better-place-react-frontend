import {
  BoldLink,
  BoxContainer,
  FormContainer,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "./Marginer";
import { AccountContext } from "./accountContext";
import { useContext, useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
  field: {
    marginTop: 5,
    // display: 'block'
    maxLength:"225"
  }
})


const SignupForm = ({ setToken, setLoginPage }) => {
  const classes = useStyles();

  const { switchToSignin } = useContext(AccountContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {passwordConfirm, setPasswordConfirm} = useState("")
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic ] = useState(""); // Some sort of defult image maybe?
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordConfirmError, setPasswordConfirmError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [phoneNumberError, setPhoneNumberError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [bioError, setBioError] = useState(false)


  const handleSubmit = (e) => {
   e.preventDefault()

    setEmailError(false);
    setPasswordError(false);
    setPasswordConfirmError(false);
    setNameError(false);
    setPhoneNumberError(false);setEmailError(false);
    setAddressError(false);
    setBioError(false);

    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
    if (passwordConfirm === "") {
      setPasswordError(true);
    }
    if (name === "") {
      setNameError(true);
    }
    if (phoneNumber === "") {
      setPhoneNumberError(true);
    }
    if (address === "") {
      setAddressError(true);
    }
    if (bio === "") {
      setBioError(true);
    }
    if (password !== passwordConfirm) {
      setPasswordConfirmError(true);
      // setPasswordConfirm("Nope Try Again")
    }
    
    
    if (
      !(
        email &&
        password &&
        passwordConfirm &&
        name &&
        phoneNumber &&
        address &&
        bio
      )
    ) {
      return;
    }
    const userSave = (data) => {
      axios
        .post("/api/users", data)
        .then((data) => {
          console.log(data);
          handleCreateUser()
        })
        .catch((e) => {
          console.log("post error:", e.message);
        });
    };


    const handleCreateUser = () => {
      // e.preventDefault();
      axios
        .post('/login', {email, password})
        .then((data) => {
          // console.log('loginToken:',data.data.token)
          setToken((prev) => ({prev, ...data.data.token}))
          setLoginPage({right: false})
        })
        .catch(e => console.log(e))
    }


    const saveData = {
      email,
      password,
      name,
      phone_number: phoneNumber,
      address,
      bio,
      picture_url: profilePic,
    };
    userSave(saveData);
    setToken({ ...saveData });

  };



  return (
    <BoxContainer>
      <FormContainer noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField 
              onChange={(e) => setEmail(e.target.value)}
              className={classes.field}
              label="Email"
              variant="outlined"
              fullWidth
              required
              error={emailError}
              value={email}
              inputProps={{maxLength: 55}}

            />
            <TextField 
              onChange={(e) => setPassword(e.target.value)}
              className={classes.field}
              label="Password"
              variant="outlined"
              fullWidth
              required
              error={passwordError}
              value={password}
              inputProps={{maxLength: 55}}

            />
            <TextField 
              // onChange={(e) => setPassword(e.target.value)}
              className={classes.field}
              label="Confirm Password"
              variant="outlined"
              fullWidth
              required
              error={passwordConfirmError}
              value={passwordConfirm}
              inputProps={{maxLength: 55}}

            />
             <TextField 
              onChange={(e) => setName(e.target.value)}
              className={classes.field}
              label="Name"
              variant="outlined"
              fullWidth
              required
              error={nameError}
              value={name}
              inputProps={{maxLength: 30}}

            />
             <TextField 
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={classes.field}
              label="Phone Number"
              variant="outlined"
              fullWidth
              required
              error={phoneNumberError}
              value={phoneNumber}
              inputProps={{maxLength: 55}}

            />
            <TextField 
              onChange={(e) => setAddress(e.target.value)}
              className={classes.field}
              label="Address"
              variant="outlined"
              fullWidth
              required
              inputProps={{maxLength: 55}}

              error={addressError}
              value={address}
            />
          <TextField 
              onChange={(e) => setBio(e.target.value)}
              className={classes.field}
              label="About Me"
              variant="outlined"
              fullWidth
              required
              error={bioError}
              inputProps={{maxLength: 225}}
              value={bio}
            />
      <Marginer direction="vertical" margin={20} />
        
        <SubmitButton type="submit" >SignUp</SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={65} />
      {/* <Marginer direction="vertical" margin="1.6em" />
      <Marginer direction="vertical" margin="1.6em" /> */}
      <MutedLink href="#">
        Already have an account?{" "}
        <BoldLink href="#" onClick={switchToSignin}>
          SignIn
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};

export default SignupForm;