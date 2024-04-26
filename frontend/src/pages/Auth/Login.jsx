import React from 'react'

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

import { useNavigate } from 'react-router-dom'


const LogIn = ({ setIsLoggedIn }) => {
  const navigate = useNavigate()
  const onSuccess = (response) => {
    const decoded = jwtDecode(response.credential);
    const { email, given_name, family_name, picture, jti } = decoded;
    localStorage.setItem("user", given_name + " " + family_name);
    localStorage.setItem("profile_url", picture);
    localStorage.setItem("token", jti);
    localStorage.setItem("email", email);
    setIsLoggedIn(true)
    navigate("/chat")
  }
  const onFailure = () => {
    console.log("OH NO!!!")
  }
  const { pathname } = useLocation()
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      <GoogleLogin
          onSuccess={onSuccess}
          onError={onFailure}
          text={`${pathname === "/login" ? "signin_with" : "signup_with"}`}
          size="medium"
          width={200}
          logo_alignment="left"
          shape="pill"
          theme="filled_black"
          style={{ backgroundColor: "#202124" }}
        />
    </GoogleOAuthProvider>
  )
}

export default LogIn