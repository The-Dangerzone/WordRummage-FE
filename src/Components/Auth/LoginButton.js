import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
    if (isAuthenticated) {
      console.log('authenticated');
    }
  };


  // return <button onClick={() => loginWithRedirect()}>Log In</button>;
  return <button onClick={() => handleLogin()}>Log In</button>;
};

export default LoginButton;