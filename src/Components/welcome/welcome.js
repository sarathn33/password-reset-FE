import React, { useEffect } from "react";
import welcome from "./ welcomeimage.svg"
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Welcome=()=>{
    const navigate=useNavigate();

    useEffect(()=>{
        const getUser=async()=>{
            const token=localStorage.getItem("token")
            if(!token) return navigate("/")
        }
        getUser();
    })

    const logoutHandler=async()=>{
        try {
            localStorage.removeItem("token")
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="welcome">
            <h1>Password Reset App</h1>
            <img className="welcomeima" src={welcome} alt="welcome"/>
            <p>Welcome to the password reset application, In this application the front-end is built using ReactJS and MaterialUI.The back-end is built using NodeJS , ExpressJS and with the database connected Mongo Atlas an cloud MongoDB platform.</p>
            <p>In the back-end JWT authentication has been used and with the EmailJS the password reset functionality has been built , password encryption and decryption has been done so that the server doesn't show the real password and will be secured. </p>
            <Button
              className="btn"
              variant="contained"
              sx={{bgcolor:"#eeaeca",":hover":{bgcolor:"#94bbe9"},"color":{color:"black"}}}
              onClick={logoutHandler}>
              LogOut
            </Button>
        </div>
    )
}

export default Welcome;