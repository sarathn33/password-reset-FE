import React, { useState } from "react";
import "./signin.css"
import * as yup from 'yup'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, CircularProgress, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

const signinValidation=yup.object({
    name:yup.string().required("Please enter your name"),
    email:yup.string().required(" Please enter the email "),
    password:yup.string().required(" Please enter the password "),
})

const Signin=()=>{
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {values,handleChange, handleSubmit,handleBlur,errors,touched}=useFormik({
    initialValues:{
        name:"",
        email:"",
        password:"",
    },
    validationSchema:signinValidation,
    onSubmit:async(values)=>{
        try {
            setLoading(true)
            const signin=await axios.post("https://password-reset-5glh.onrender.com/signup",values)
            alert("Account created Successfully! Please login again")
            console.log(signin)
            navigate("/")
            
        } catch (error) {
            alert("User Already Exists! Please login")
            navigate("/")
            console.log(error) 
        }finally{
            setLoading(false)
        }

    }
  });
    return(
        <div className="signin">
            <h1>Password Reset Application</h1>
            <Container maxWidth="sm">
        <Box sx={{  height: '80vh' , display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',}} >
        <Avatar sx={{ m:1, bgcolor: 'red'}}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>SignIn</h2>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 1}}>
          <TextField
              sx={{m:1,width:"25ch"}}
              margin="normal"
              onBlur={handleBlur}
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={values.name}
              autoComplete="name"
              onChange={handleChange}
              
            />
            {touched.name && errors.name ? <p style={{color:"crimson"}}>{errors.name}</p>:" "}
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
            <FormControl sx={{ m: 1,width:"25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              margin="normal"
              onBlur={handleBlur}
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={values.password}
              autoComplete="current-password"
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
            {touched.password && errors.password ? <p style={{color:"crimson"}}>{errors.password}</p>:" "}
            
            <Button
              type="submit"
              fullWidth
              className="btn"
              variant="contained"
              disabled={loading}
              sx={{m:1,width:"285px",bgcolor:"#eeaeca",":hover":{bgcolor:"#94bbe9"},"color":{color:"black"}}}
            >
              {loading?<CircularProgress color="secondary" />:"SignIn"}
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

export default Signin;