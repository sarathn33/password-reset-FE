import React, { useState } from "react";
import * as yup from 'yup'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { Avatar, Box, Button, CircularProgress, Container, TextField } from "@mui/material";


const forgotValidation=yup.object({
    email:yup.string().required(" Please enter the email "),
})

const Forgot=()=>{

    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
   

  const {values,handleChange, handleSubmit,handleBlur,errors,touched}=useFormik({
    initialValues:{
        email:"",
    },
    validationSchema:forgotValidation,
    onSubmit:async(values)=>{
        try {
            setLoading(true)
            const forgot=await axios.post("https://password-reset-5glh.onrender.com/forgotPassword",values)
            alert("Mail sent to your account with passsword reset code")
            console.log(forgot)
            navigate("/reset")
            
        } catch (error) {
            alert("Entered email address doesn't exist")
            navigate("/")
            console.log(error) 
        }finally{
            setLoading(false)
        }

    }
});
    return(
        <div className="forgot-pw">
           <h1>Password Reset Application</h1>
            <Container maxWidth="sm">
        <Box sx={{  height: '80vh' , display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',}} >
        <Avatar sx={{ m:1, bgcolor: 'red'}}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Forgot Password</h2>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 1}}>
            <TextField
              sx={{m:1,width:"25ch"}}
              margin="normal"
              onBlur={handleBlur}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={values.email}
              autoComplete="email"
              onChange={handleChange}
              
            />
            {touched.email && errors.email ? <p style={{color:"crimson"}}>{errors.email}</p>:" "}
            
            <Button
              type="submit"
              fullWidth
              className="btn"
              variant="contained"
              disabled={loading}
              sx={{m:1,width:"285px",bgcolor:"#eeaeca",":hover":{bgcolor:"#94bbe9"},"color":{color:"black"}}}
            >
              {loading?<CircularProgress color="secondary" />:"Send OTP"}
            </Button>
            
          </Box>
          <Button
              className="btn"
              variant="contained"
              sx={{m:1,width:"285px",bgcolor:"#94bbe9",":hover":{bgcolor:"#eeaeca"},"color":{color:"black"}}}
              onClick={()=>navigate("/")}
            >
                LogIn
            </Button>
        </Box>
      </Container>
        </div>
    )
}

export default Forgot;