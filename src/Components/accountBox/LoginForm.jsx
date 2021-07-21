import { BoldLink, BoxContainer, MutedLink, SubmitButton } from "./common"
import { Marginer } from './Marginer';
import { AccountContext } from './accountContext'
import { useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import axios from 'axios';

const useStyles = makeStyles({
  field: {
    marginTop: 5,
    marginBottom: 5,
    // display: 'block'
    maxLength:"225"
  }
})


const LoginForm = ({ setToken, token, toggleLogin, setLoginPage}) => {

  const classes = useStyles();
  const {switchToSignup} = useContext(AccountContext)
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const  [emailError, setEmailError] = useState(false)
  const  [passwordError, setPasswordError] = useState(false)

  

  const handleSubmit = async e => {

    setEmailError(false);
    setPasswordError(false);

    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }



    e.preventDefault();
    axios
      .post('/login', {email, password})
      .then((data) => {
        console.log('loginToken:',data.data.token)
        setToken((prev) => ({prev, ...data.data.token}))
        setLoginPage({right: false})
      })
      .catch(e => console.log(e))
  }



  return (
    <BoxContainer>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {/* <FormContainer > */}
        <TextField 
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className={classes.field}
              label="Email"
              variant="outlined"
              fullWidth
              required
              error={emailError}
              // value={email}
              inputProps={{maxLength: 55}}

            />
            <Marginer direction="vertical" margin={10} />
            <TextField
              type="password" 
              onChange={(e) => setPassword(e.target.value)}
              className={classes.field}
              label="Password"
              variant="outlined"
              fullWidth
              required
              error={passwordError}
              // value={email}
              inputProps={{maxLength: 55}}

            />
      <Marginer direction="vertical" margin={40} />
      <SubmitButton type="submit">SignIn</SubmitButton>
      </form>
      <Marginer direction="vertical" margin={15} />
      {/* <MutedLink >Forgot Your password?</MutedLink> */}
      <Marginer direction="vertical" margin='1.6em' />
      <MutedLink href="#">Dont have an account? <BoldLink href='#' onClick={switchToSignup}>SignUp</BoldLink></MutedLink>
    </BoxContainer>
  )
}

export default LoginForm

