import React, { useEffect, useState} from "react";
import "./login.css";
import { Button, Avatar, Box, Container, Grid, TextField, CircularProgress, IconButton, InputAdornment,  OutlinedInput, InputLabel, FormControl } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup'
import { useFormik } from "formik";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const loginValidation=yup.object({
    email:yup.string().required(" Please enter the email "),
    password:yup.string().required(" Please enter the password "),
})

const Login=()=>{
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    useEffect(()=>{
       if(!localStorage.getItem("token")) {
        navigate("/")
       }
    })
    const {values,handleChange, handleSubmit,handleBlur,errors,touched}=useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        validationSchema:loginValidation,
        onSubmit:async(values)=>{

            try {
                setLoading(true)
                const login=await axios.post("https://password-reset-5glh.onrender.com/login",values)
                localStorage.setItem("token", login.data.token)
                navigate("/welcome")
                
            } catch (error) {
                alert("Invalid login credentials! Please signin",error);
                navigate("/signin")
                console.log(error) 
            }finally{
                setLoading(false)
            }
        }  
    })

        
    
    return(
        <div className="login">
            <h1>Password Reset Application</h1>
            <Container maxWidth="sm">
        <Box sx={{  height: '80vh' , display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',}} >
        <Avatar sx={{ m:1, bgcolor: 'red'}}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Login</h2>
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
              {loading?<CircularProgress color="secondary" />:"LogIn"}
            </Button>
            <Grid container className="links">
              
                <p className="forgot" variant="body2">
                  <Link to="/forgot">
                  Forgot password?
                  </Link>
                </p>
            
           
                <p className="sign"  variant="body2">
                  <Link to="/signin">
                  Sign Up
                  </Link>
                   
                </p>
             
            </Grid>
          </Box>
        </Box>
      </Container>
                
           
        </div>
    )
}
export default Login;