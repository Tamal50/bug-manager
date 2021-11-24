import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Component/Login/Login';
import Homepage from './Pages/Homepage';
import { createContext, useState } from 'react';
import firebase from 'firebase'
import { useEffect } from 'react';
import Bug from './Component/BugDetails/Bug';
import Admin from './Pages/Admin';
import PrivateRoute from './Component/Login/PrivateRoute';


export const UserContext = createContext(null)

function App() {

  const [logInUser,setLogInUser] = useState({});


  const generateToken = () => {
    const User = firebase.auth().currentUser
    console.log(User.email)
    User.getIdToken(false).then(token => {
        sessionStorage.setItem("token", token);
        localStorage.setItem("token", token);
    })
  }

  const handleAfterSignInOutResponse = async (user) => {
    if (user) {
        // IF Found User Data means Authenticated 
        console.log(user.displayName)
        setLogInUser(user);
        generateToken()
    } else {
        // User is signed out
        setLogInUser({});
    }
  }
  useEffect(() => {
    // onAuthStateChanged will executed in login and logout
    const unsubscribe = firebase.auth().onAuthStateChanged (handleAfterSignInOutResponse);
    // unsubscribe when unmounting the component
    return unsubscribe;
    // eslint-disable-next-line
  }, []);
  console.log("useer" , logInUser)
  return (
    <UserContext.Provider value={[logInUser,setLogInUser]}>
      <Router>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/login">
            <Login></Login>
          </Route> 
          <PrivateRoute exact path="/bug/:id">
            <Bug></Bug>
          </PrivateRoute>
          <PrivateRoute exact path="/dashboard">
            <Admin></Admin>
          </PrivateRoute>       
      </Router>
    </UserContext.Provider>
  );
}

export default App;
