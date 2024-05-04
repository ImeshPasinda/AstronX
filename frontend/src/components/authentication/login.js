import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl_auth, API_POST_LOGIN } from '../../constant/apiConstant';
import Cookies from 'js-cookie';
import CryptoJS from "crypto-js";
import { Alert, AlertIcon, Button, Spinner, FormControl, Input, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { decodeAuthToken } from '../../utils/utility';
import { NAVIGATE_TO_HOME, NAVIGATE_TO_INVALID_ROUTES, NAVIGATE_TO_REGISTER } from '../../constant/routeConstant';
import { EMAIL_PATTERN } from '../../constant/commonConstant';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);

  const isEmailError = !email && emailTouched;
  const isPasswordError = !password && passwordTouched;


  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setEmailTouched(true);
        setPasswordTouched(true);
        return;
      }

      if (!EMAIL_PATTERN.test(email)) {
        setIsInvalidEmail(true);
        return;
      } else {
        setIsInvalidEmail(false);
      }
      setIsLoggingIn(true);
      const response = await axios.post(`${baseUrl_auth}${API_POST_LOGIN}/`, {
        email: email.toLowerCase(),
        password,
      });

      const token = response.data.token;
      const decodedToken = decodeAuthToken(token);

      if (!decodedToken) {
        return;
      }

      // Set the authToken cookie with a 2-day expiration
      Cookies.set('authToken', token, { expires: 2 });
      const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(decodedToken), process.env.REACT_APP_ENCRYPTION_SECRET).toString();
      localStorage.setItem('uData', encryptedData);
      window.location.href = NAVIGATE_TO_HOME;

    } catch (error) {
      console.error('Login error:', error.response.data.message);
      setError(error.response.data.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div style={{ marginBottom: '10%' }}>
      <div className="container-fluid d-flex align-items-center justify-content-center" style={{ marginTop: '100px', paddingLeft: '40px', paddingRight: '40px' }}>
        <div className="col-md-3">
          <h3 className="text-center" style={{ fontWeight: 400 }}>Welcome Back</h3>
          <form>
            <h5 className="text-center" style={{ fontWeight: 350, fontSize: 20 }}>Unveiling the Wonders of the Universe.</h5>
            {error &&
              <Alert status='error'>
                <AlertIcon />
                <h6 style={{ color: '#404040', fontWeight: 400 }}>Oops! {error}. It seems there's a hiccup in your login attempt. Please give it another shot.</h6>
              </Alert>
            }
            <div className="form-group" style={{ marginBottom: '15px', marginTop: '15px' }}>
              <FormLabel style={{ fontWeight: 'bold', letterSpacing: '1px', fontSize: 12, marginBottom: '6px' }}>EMAIL</FormLabel>
              <FormControl isInvalid={isEmailError || isInvalidEmail}>
                <Input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  borderColor='#0056d2'
                  height="45px"
                  onBlur={() => setEmailTouched(true)}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {isEmailError && (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
                {isInvalidEmail && (
                  <FormErrorMessage>Invalid email.</FormErrorMessage>
                )}
              </FormControl>
            </div>
            <div className="form-group" style={{ marginBottom: '10px' }}>
              <FormLabel style={{ fontWeight: 'bold', letterSpacing: '1px', fontSize: 12, marginBottom: '6px' }}>PASSWORD</FormLabel>
              <FormControl isInvalid={isPasswordError}>
                <Input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  borderColor='#0056d2'
                  height="45px"
                  onBlur={() => setPasswordTouched(true)}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {isPasswordError && (
                  <FormErrorMessage>Password is required.</FormErrorMessage>
                )}
              </FormControl>
            </div>
            <h5 style={{ fontWeight: 350, fontSize: 15 }}>
              <a href={NAVIGATE_TO_INVALID_ROUTES} style={{ color: '#0056d2' }}>Forgot password?</a>
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Button
                bg='#0056d2'
                color='white'
                variant='solid'
                borderRadius='4px'
                size='lg'
                type="button"
                onClick={handleLogin}
                className="btn btn-primary mt-3"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? <Spinner size="sm" color="white" /> : "Login"}
              </Button>
            </div>
            <h5 className="text-center" style={{ fontWeight: 350, fontSize: 15, marginTop: '20px' }}>
              New to AstronX? <a href={NAVIGATE_TO_REGISTER} style={{ color: '#0056d2', textDecoration: 'underline' }}>Sign up</a>
            </h5>

          </form>
        </div>
      </div>
    </div>
  );
};
