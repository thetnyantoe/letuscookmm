import React, { useEffect, useState,useContext, useRef } from 'react';
import {Link,useLocation} from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './hamburgerexclusive.css';
import { LuLanguages } from "react-icons/lu";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { ToggleContext } from '../pages/ToggleContext';

const Nav = () => {
  const [user, setUser] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { usePreferredText, setUsePreferredText } = useContext(ToggleContext);
  const { isDarkMode, setIsDarkMode } = useContext(ToggleContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  let username = localStorage.getItem('Authname')??null;
  let capitalized;

  const dropdownTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {

    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200); 
  };

  const handleToggleClick = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setDropdownOpen(prev => !prev);
  };

  useEffect(() => {
    axios.get('http://localhost:8888/letuscook/backend/dashboard/profile.php',{
        params: {
          userid: localStorage.getItem('Authid')
        }
      })
      .then((response) => {
        console.log(response.data[0])
        setUser(response.data[0]);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, []);

if(username){
  capitalized = username.charAt(0).toUpperCase();
}
  const handleLogout = ()=>{
    console.log('logout')
    localStorage.removeItem('Authname');
    localStorage.removeItem('Authrole');  localStorage.removeItem('Authid');localStorage.removeItem('Loggedin');localStorage.removeItem('email');localStorage.removeItem('letuscook_basket');localStorage.removeItem('currentView')
    window.location.reload();
  }
  return (
    <>
      <header className={`${location.pathname === '/' || location.pathname === '/meals' || location.pathname === '/cooks' || location.pathname === '/faqs' ? 'absolute':'relative mt-[20px]'} ${location.pathname=='/login'?'top-[10px]':'top-[40px]'} left-0 right-0 sora bg-white-100 bg-opacity-40 backdrop-blur-lg border-[0.5px] border-gray-400 dark:border-white shadow-md z-10 rounded-[220px]  w-auto mx-[20px] sm:mx-[20px] xl:mx-[40px]  ${location.pathname=='/admin/dashboard' ? 'hidden':'block'}`}>
        <nav className="p-2 md:p-0 flex justify-between h-auto">
          <Link to="/" className={`text-sm md:text-lg rounded-[20px] md:rounded-[220px] font-light h-full bg-white text-black md:py-3 px-2 md:px-8 border border-[0.8px] border-black dark:border-white`}>
            {usePreferredText?'ပင်မ':'Home'}
          </Link>
          <div className='w-[120px] flex justify-around'>
            <button className={`text-sm md:text-lg rounded-[100px]  font-light h-full ${usePreferredText ? 'bg-white ':' text-black'} space-x-4 text-black bg-white px-5 cursor-pointer border border-[0.8px] border-black dark:border-white`} onClick={() => setUsePreferredText(prev => !prev)}><LuLanguages/></button>
            <button className={`text-sm md:text-xl rounded-[100px] font-light h-full ${isDarkMode?'bg-white text-black':'bg-black text-white'} space-x-4  px-5 cursor-pointer`}  onClick={() => setIsDarkMode(!isDarkMode)}>{isDarkMode?<MdLightMode/>:<MdDarkMode/>} </button>
          </div>
          <div>
            <div id="hee" className="space-x-2 md:space-x-0  hidden xl:flex items-center">
              <Link to="/meals" className={`text-sm md:text-lg md:rounded-[220px] font-light ${location.pathname == '/login' || location.pathname =='/signup' || location.pathname =='/aboutus' || location.pathname =='/contactus' ?'text-black dark:text-white bg-white dark:bg-black border border-black dark:border-white':'text-white border border-white '} md:border-[0.5px] md:py-3 md:px-8`}>{usePreferredText?'အစားအစာ':'Meals'}</Link>
              <Link to="/cooks" className={`text-sm md:text-lg md:rounded-[220px] font-light ${location.pathname == '/login' || location.pathname =='/signup' || location.pathname =='/aboutus' || location.pathname =='/contactus' ?'text-black dark:text-white bg-white dark:bg-black border border-black dark:border-white':'text-white border border-white '} md:border-[0.5px] md:py-3 md:px-8`}>{usePreferredText?'စာဖိုမှုးများ':'Cooks'}</Link>
              <Link to="/aboutus" className={`text-sm md:text-lg md:rounded-[220px] font-light ${location.pathname == '/login' || location.pathname =='/signup' || location.pathname =='/aboutus' || location.pathname =='/contactus' ?'text-black dark:text-white bg-white dark:bg-black border border-black dark:border-white':'text-white border border-white '} md:border-[0.5px] md:py-3 md:px-8`}>{usePreferredText?'တို့အကြောင်း':'AboutUs'}</Link>
              <Link to="/contactus" className={`text-sm md:text-lg md:rounded-[220px] font-light ${location.pathname == '/login' || location.pathname =='/signup' || location.pathname =='/aboutus' || location.pathname =='/contactus' ?'text-black dark:text-white bg-white dark:bg-black border border-black dark:border-white':'text-white border border-white '} md:border-[0.5px] md:py-3 md:px-8`}>{usePreferredText?'ချိတ်ဆက်':'ContactUs'}</Link>
              {username ? (
        <div
          className="relative inline-block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {user.avatar ? 
              <img 
                src={`http://localhost:8888/letuscook/backend/images/users/${user.avatar}`} 
                className='cursor-pointer size-[53px] md:rounded-[220px] font-light' 
                alt="" 
              />
             : 
              <button
                onClick={handleToggleClick}
                className="cursor-pointer text-sm md:text-lg md:rounded-[220px] font-light text-white md:py-3 bg-[#e59d2c] md:px-[22px]"
              >
                {capitalized}
              </button>
            }

          {dropdownOpen && (
            <div className="absolute right-0 z-50 bg-black rounded-lg shadow-sm w-44 ">
              <ul className="py-2 text-sm  ">
                  <li>
                    <Link to="admin/dashboard" onClick={()=>localStorage.setItem('currentView','profile')} className="block px-4 py-2 text-white">Profile</Link>
                  </li>
                {localStorage.getItem('Authrole') == 'User'? (<>
                  <li>
                    <Link to="admin/dashboard" onClick={()=>localStorage.setItem('currentView','myorders')} className="block px-4 py-2 text-white">MyOrders</Link>
                  </li>
                </>):(localStorage.getItem('Authrole') == 'Cook'? (<>
                  
                  <li>
                    <Link to="admin/dashboard" onClick={()=>localStorage.setItem('currentView','cookDashboard')} className="block px-4 py-2 text-white">Reports</Link>
                  </li>
                  <li>
                    <Link to="admin/dashboard" onClick={()=>localStorage.setItem('currentView','cooksmeals')} className="block px-4 py-2 text-white">MyMeals</Link>
                  </li>
                  <li>
                    <Link to="admin/dashboard" onClick={()=>localStorage.setItem('currentView','orderscook')} className="block px-4 py-2 text-white">MyOrders</Link>
                  </li>
                </>):(<>
                  <li>
                    <Link to="admin/dashboard" onClick={()=>localStorage.setItem('currentView','dashboard')} className="block px-4 py-2 text-white">Reports</Link>
                  </li>
                  <li>
                    <Link to="admin/dashboard" onClick={()=>localStorage.setItem('currentView','users')} className="block px-4 py-2 text-white">Users</Link>
                  </li>
                  <li>
                    <Link to="admin/dashboard" onClick={()=>localStorage.setItem('currentView','meals')} className="block px-4 py-2 text-white">Meals</Link>
                  </li>
                  <li>
                    <Link to="admin/dashboard" onClick={()=>localStorage.setItem('currentView','categories')} className="block px-4 py-2 text-white">Categories</Link>
                  </li>
                  <li>
                    <Link to="admin/dashboard" onClick={()=>localStorage.setItem('currentView','reviews')} className="block px-4 py-2 text-white">Reviews</Link>
                  </li>
                  <li>
                    <Link to="admin/dashboard" onClick={()=>localStorage.setItem('currentView','orders')} className="block px-4 py-2 text-white">Orders</Link>
                  </li>
                  <li>
                    <Link to="admin/dashboard" onClick={()=>localStorage.setItem('currentView','promotion')} className="block px-4 py-2 text-white">Promotion</Link>
                  </li>
                </>))
                
                }
                <li>
                  <button onClick={()=>handleLogout()} className="block px-4 py-2 ">Sign out</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        // className="text-sm md:text-lg md:rounded-[220px] font-light text-white md:border-[0.5px] md:py-3 md:px-8"
        <Link to="/login" className={`text-sm md:text-lg md:rounded-[220px] font-light ${location.pathname == '/login' || location.pathname =='/signup' || location.pathname =='/aboutus' || location.pathname =='/contactus' ?'text-black dark:text-white bg-white dark:bg-black border border-black dark:border-white':'text-white border border-white '} md:border-[0.5px] md:py-3 md:px-8`} >
          SignIn
        </Link>
      )}

            </div>
            <div
              className={`hamburgerMenuContainer h-auto space-y-[6px] cursor-pointer block mt-[2px] md:mt-[20px] md:mr-[10px] xl:hidden ${menuOpen ? 'isOpened' : ''}`}
              onClick={toggleMenu}
            >
              <div className={`line1 bg-white w-[25px] h-[1.2px] transition-transform ${menuOpen ? 'line1Transform' : ''}`}></div>
              <div className={`line2 bg-white w-[25px] h-[1.2px] transition-opacity ${menuOpen ? 'removeLine2' : ''}`}></div>
              <div className={`line3 bg-white w-[25px] h-[1.2px] transition-transform ${menuOpen ? 'line3Transform' : ''}`}></div>
            </div>
          </div>
        </nav>
      </header>

      {/* Overlay menu */}
      <div
        className={`overlayMenu text-[#e59d2c] ${menuOpen ? 'showOverlay' : ''}`}
        onClick={closeMenu}
      >
        <ul>
          <Link className={menuOpen ? 'liUp block mb-2 text-[19px] cursor-pointer' : ''} to="/">{usePreferredText?'ပင်မ':'Home'}</Link>
          <Link className={menuOpen ? 'liUp block mb-2 text-[19px] cursor-pointer' : ''} to="/meals">{usePreferredText?'အစားအစာ':'Meals'}</Link>
          <Link className={menuOpen ? 'liUp block mb-2 text-[19px] cursor-pointer' : ''} to="/cooks">{usePreferredText?'စာဖိုမှုးများ':'Cooks'}</Link>
          <Link className={menuOpen ? 'liUp block mb-2 text-[19px] cursor-pointer' : ''} to="/aboutus">{usePreferredText?'တို့အကြောင်း':'AboutUs'}</Link>
          <Link className={menuOpen ? 'liUp block mb-2 text-[19px] cursor-pointer' : ''} to="/contactus">{usePreferredText?'ချိတ်ဆက်':'ContactUs'}</Link>
          <Link className={menuOpen ? 'liUp block mb-2 text-[19px] cursor-pointer' : ''} onClick={()=>localStorage.setItem('currentView','profile')} to="/admin/dashboard">{usePreferredText?'ပရိုဖိုင်':'Profile'}</Link>
        </ul>
      </div>
    </>
  );
};

export default Nav;
