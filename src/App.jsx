import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import './App.css'
import Contactus from './pages/Contactus';
import  AOS  from 'aos'
import 'aos/dist/aos.css'
import Home from './pages/Home'
import Aboutus from './pages/Aboutus'
import Meals from './pages/Meals'
import Cooks from './pages/Cooks'
import Nav from './includes/Nav'
import Footer from './includes/Footer';
import FollowCursor from './includes/FollowCursor'
import Dashboard from './pages/admin/Dashboard';
import Signup from './pages/authentication/Signup';
import Login from './pages/authentication/Login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Editmeal from './components/dashboard/Editmeal';
import EnterEmail from './pages/authentication/forgotpassword/EnterEmail';
import VerifyOTP from './pages/authentication/forgotpassword/VerifyOTP';
import ResetPassword from './pages/authentication/forgotpassword/ResetPassword';
import FAQs from './pages/FAQs';
import Termsandconditions from './pages/Termsandconditions'
import { useEffect } from 'react';


function App() {
  useEffect(()=>{
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      offset:80,
    }
    );
  },[])
  return (
    <>
    <BrowserRouter>
      <Nav/>
      <FollowCursor/>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/contactus" element={<Contactus/>}/>
          <Route path="/aboutus" element={<Aboutus/>}/>
          <Route path="/meals" element={<Meals/>}/>
          <Route path="/cooks" element={<Cooks/>}/>
          <Route path="/admin/dashboard" element={<Dashboard/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login/enteremail" element={<EnterEmail/>}/>
          <Route path="/login/verifyotp" element={<VerifyOTP/>}/>
          <Route path="/login/resetpassword" element={<ResetPassword/>}/>
          <Route path="/faqs" element={<FAQs/>}/>
          <Route path="/termsandconditions" element={<Termsandconditions/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
      <ToastContainer position="bottom-right" theme="dark" autoClose={2000}/>
    </>
  )
}

export default App
