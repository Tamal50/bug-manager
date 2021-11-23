import * as React from 'react';
import  { useState , useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAuth,signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from 'firebase';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.config';
import { UserContext } from '../../App';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { GoogleAuthProvider } from "firebase/auth";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
firebase.initializeApp(firebaseConfig);

const theme = createTheme();

export default function From() {

//...........Signup........................//

const [login, setLogin ] = useState(false)

  const [logInUser, setLogInUser] = useContext(UserContext);
  const [error,setError] = useState("")
  const [user, setUser] = useState({
    email:'',
    password:'',
  })
  console.log(user)
  const history = useHistory();
  // const location = useLocation();
  const { from } =  { from: { pathname: "/" } };

  const handleSignIn = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(user.email ,user.password)
    .then(res => {
      console.log(res)
        user = res.user;
      })
      .catch((error) => {
        if (error.message ==="Assignment to constant variable."){
          storeAuthToken();
          setLogInUser(user);
          alert("login successfully")
          history.replace(from);
          return error.message
        }
        var errorMessage = error.message;
        alert(errorMessage)
        setError(errorMessage)
      });
    }
  const storeAuthToken = () => {
      firebase.auth().currentUser.getIdToken(true)
      .then(function(idToken) {
        console.log("token",idToken)
        sessionStorage.setItem('token', idToken);
        console.log("tokentokentokentoken",idToken)
        
      })
      .catch(function(error) {
      });
    }
    const handleOnChange = (e) => {
        const newUserInfo = {
            ...user
          };
        let isValid = true;
          if(e.target.name === "password"){
            isValid = e.target.value.length > 8 ;
          }
          newUserInfo[e.target.name] = e.target.value;
          newUserInfo.isValid = isValid;
          setUser(newUserInfo);
    }
console.log("datallllll" , logInUser);
   
   
//...........Signup........................//

const [signup, Setsignup] = useState([])

const handleSignUp = (e) => {

    e.preventDefault()
  firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
  .then((res) =>{
    var user = res.user
     
    Setsignup(user)
  })
  .catch((error) => {
    var errorMessage = error.message;
    alert(errorMessage)
  });
  
}


//...........Google  Signup........................//
  // const handleGoogleLogin = (e) => {
  // const provider = new GoogleAuthProvider();
  // const auth = getAuth();
  // signInWithPopup(auth, provider)
  //   .then((result) => {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     // The signed-in user info.
  //     const user = result.user;
  //     // ...
  //   }).catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });
  // }
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form"   noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onBlur={handleOnChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onBlur={handleOnChange}
            />
            <div className="flex flex-row gap-4" >
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
                onClick={(e)=>handleSignIn(e)}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
                onClick={(e)=>handleSignUp(e)}
              >
                Sign up
              </Button>
            </div>
            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
                // onClick={(e)=>handleGoogleLogin(e)}
              >
                Google Sign in
              </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}