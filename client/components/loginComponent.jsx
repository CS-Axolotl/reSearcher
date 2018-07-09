import React from 'react';
import { GoogleLogin } from 'react-google-login';
import config from '../config.json';
const LoginComponent = (props) => (
  <GoogleLogin
    clientId={config.GOOGLE_CLIENT_ID}
    buttonText="Login"
    onSuccess={props.googleResponse}
    onFailure={props.onFailure}
  />
)


export default LoginComponent;