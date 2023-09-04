import React, { useState } from "react";
import * as yup from 'yup'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { Avatar, Box, Button, CircularProgress, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const resetValidation=yup.object({
    secretCode:yup.string().required("Please enter the OTP sent to your email"),
    newPassword:yup.string().required(" Please enter the new password"),
})

const Reset=()=>{

    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
   

  const {values,handleChange, handleSubmit,handleBlur,errors,touched}=useFormik({
    initialValues:{
        email:"",
    },
    validationSchema:resetValidation,
    onSubmit:async(values)=>{
        try {
            setLoading(true)
            const reset=await axios.post("https://password-reset-5glh.onrender.com/passwordReset",values)
            alert("Password changed successfully! You can now login with your new password")
            console.log(reset)
            navigate("/")
            
        } catch (error) {
            alert("Please enter valid OTP")
            navigate("/forgot")
            console.log(error) 
        }finally{
            setLoading(false)
        }

    }
});
    return(
        <div className="reset-pw">
           <h1>Password Reset Application</h1>
            <Container maxWidth="sm">
        <Box sx={{  height: '80vh' , display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',}} >
        <Avatar sx={{ m:1, bgcolor: 'red'}}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Reset Password</h2>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 1}}>
            <TextField
              sx={{m:1,width:"25ch"}}
              margin="normal"
              onBlur={handleBlur}
              fullWidth
              id="secretCode"
              label="OTP"
              name="secretCode"
              value={values.secretCode}
              autoComplete="secretCode"
              onChange={handleChange}
              
            />
            {touched.secretCode && errors.secretCode ? <p style={{color:"crimson"}}>{errors.secretCode}</p>:" "}

            <FormControl sx={{ m: 1,width:"25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              margin="normal"
              onBlur={handleBlur}
              fullWidth
              name="newPassword"
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              id="newPassword"
              value={values.newPassword}
              autoComplete="new password"
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            </FormControl>
            {touched.newPassword && errors.newPassword ? <p style={{color:"crimson"}}>{errors.newPassword}</p>:" "}
            
            <Button
              type="submit"
              fullWidth
              className="btn"
              variant="contained"
              disabled={loading}
              sx={{m:1,width:"285px",bgcolor:"#eeaeca",":hover":{bgcolor:"#94bbe9"},"color":{color:"black"}}}
            >
              {loading?<CircularProgress color="secondary" />:"Change Password"}
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

export default Reset;