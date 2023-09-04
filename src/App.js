import { Route, Routes } from 'react-router-dom';
import './App.css';
import "./Components/Login/login"
import Login from './Components/Login/login';
import Welcome from './Components/welcome/welcome';
import Signin from './Components/Signin/signin';
import Forgot from './Components/Forgot/forgot';
import Reset from './Components/Reset/reset';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/welcome' element={<Welcome/>}/> 
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/forgot' element={<Forgot/>}/>
        <Route path='/reset' element={<Reset/>}/>

      </Routes>
       
    </div>
  );
}

export default App;
