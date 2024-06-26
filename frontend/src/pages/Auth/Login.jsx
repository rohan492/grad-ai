import React from 'react'

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { Card, message } from 'antd'

import { useNavigate } from 'react-router-dom'

import { GoogleLoginService } from '../../services/AuthServices.js'

const LogIn = ({ setIsLoggedIn }) => {
  const navigate = useNavigate()
  const onSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    const { email, given_name, family_name, picture, jti } = decoded;
    localStorage.setItem("user", given_name + " " + family_name);
    localStorage.setItem("profile_url", picture);
    localStorage.setItem("token", jti);
    localStorage.setItem("email", email);
    let googleResponse = await GoogleLoginService({
      username: given_name + " " + family_name,
      email
    })
    console.log(googleResponse)
    if (googleResponse?.status === 200) {
      setIsLoggedIn(true)
      navigate("/rag-upload")
      message.success(googleResponse?.data?.msg || "Login Successfull!")
    } else {
      message.error("There was an error. Please try again after sometime.")
    }
  }
  const onFailure = () => {
    console.log("OH NO!!!")
  }
  const { pathname } = useLocation()
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      <div className='w-full flex justify-center items-center h-screen bg-[#213547]'>
        <Card className='bg-black shadow-3xl h-[10%]'>
          <GoogleLogin
              onSuccess={onSuccess}
              onError={onFailure}
              text={`${pathname === "/login" ? "signin_with" : "signup_with"}`}
              size="medium"
              width={200}
              logo_alignment="left"
              shape="pill"
              theme="filled_black"
            />
        </Card>
      </div>
    </GoogleOAuthProvider>
  )
}

export default LogIn