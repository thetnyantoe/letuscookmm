import React, { useState,useContext, useEffect } from "react";
import {Link,useLocation} from 'react-router-dom';
import { Menu, X, User } from "lucide-react";
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { FaShoppingBag } from "react-icons/fa";
import Users from '../../components/dashboard/Users'
import Reports from "../../components/dashboard/Reports";
import Categories from "../../components/dashboard/Categories";
import { GiHotMeal } from "react-icons/gi";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdRateReview } from "react-icons/md";
import Mealstable from "../../components/dashboard/Mealstable";
import Addmeal from "../../components/dashboard/Addmeal";
import Cooksmealstable from "../../components/dashboard/Cooksmealstable";
import { IoMdAdd } from "react-icons/io";
import Reviews from "../../components/dashboard/Reviews";
import PersonalReviews from "../../components/dashboard/personalReviews";
import Editmeal from "../../components/dashboard/Editmeal";
import Tomeorder from "../../components/dashboard/Tomeorder";
import { IoReceipt } from "react-icons/io5";
import Tomeordercook from "../../components/dashboard/Tomeordercook";
import Profile from "../../components/dashboard/Profile";
import { ImProfile } from "react-icons/im";
import { LuBadgePercent } from "react-icons/lu";
import { Promotion } from "../../components/dashboard/Promotion";
import { IoFastFoodSharp } from "react-icons/io5";
import Myorders from "../../components/dashboard/Myorders";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { ToggleContext } from "../ToggleContext";
import { HiHome } from "react-icons/hi2";
import CookReports from "../../components/dashboard/CookReports";


export default function Dashboard() {
  
  const [currentView ,setCurrentView] = useState(localStorage.getItem('currentView'));
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editMealId,setEditMealId] = useState(null);
  const { isDarkMode, setIsDarkMode } = useContext(ToggleContext);
  useEffect(() => {
    localStorage.setItem('currentView',currentView);
  }, [currentView]);
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-zinc-900 mb-[-200px] w-full ">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-[95px]"
        }fixed  z-[100] bg-white dark:bg-black border-r transition-all duration-300 ease-in-out p-1 sm:p-4 flex flex-col justify-between `}
      >
        <div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mb-6"
          >
            {sidebarOpen ? <X className="cursor-pointer" /> : <Menu className="ml-[13px] size-[25px] cursor-pointer"/>}
          </button>
          <nav className="space-y-4">
            
            <div className="block pl-0 rounded flex flex-cols items-center text-[18px]" onClick={()=>setCurrentView("profile")}>
              <button className={`${isDarkMode?'bg-white text-black':'bg-black text-white'} p-4 cursor-pointer rounded-sm`}  onClick={() => setIsDarkMode(!isDarkMode)}>{isDarkMode?<MdLightMode/>:<MdDarkMode/>} </button> 
            </div>

            <a href="#" className="block py-2 px-4 rounded hover:bg-gray-200 flex flex-cols items-center text-[18px]" onClick={()=>setCurrentView("profile")}>
              <ImProfile className="inline-block mr-2"/> <span className={`${sidebarOpen ? "inline-block" : "hidden"}`}>Profile</span> 
            </a>

            {localStorage.getItem('Authrole') == 'Admin' && <a href="#" className="block py-2 px-4 rounded hover:bg-gray-200 flex flex-cols items-center text-[18px]" onClick={()=>setCurrentView("dashboard")}>
              <MdDashboard className="inline-block mr-2"/> <span className={`${sidebarOpen ? "inline-block" : "hidden"}`}>Reports</span> 
            </a>}

            {localStorage.getItem('Authrole') == 'Cook' && <a href="#" className="block py-2 px-4 rounded hover:bg-gray-200 flex flex-cols items-center text-[18px]" onClick={()=>setCurrentView("cookDashboard")}>
              <MdDashboard className="inline-block mr-2"/> <span className={`${sidebarOpen ? "inline-block" : "hidden"}`}>Reports</span> 
            </a>}

            {localStorage.getItem('Authrole') == 'Admin' && <a href="#" className="block py-2 px-4 rounded hover:bg-gray-200 flex flex-cols items-center text-[18px]" onClick={()=>setCurrentView("users")}>
              <HiUsers className="inline-block mr-2"/> <span className={`${sidebarOpen ? "inline-block" : "hidden"}`}>Users</span> 
            </a>}

            {localStorage.getItem('Authrole') == 'Admin' && <a href="#" className="block py-2 px-4 rounded hover:bg-gray-200 flex flex-cols items-center text-[18px]" onClick={()=>setCurrentView("meals")}>
              <GiHotMeal className="inline-block mr-2"/><span className={`${sidebarOpen ? "inline-block" : "hidden"}`}>Meals</span></a> } 
            {localStorage.getItem('Authrole') == 'Cook' && <a href="#" className="block py-2 px-4 rounded hover:bg-gray-200 flex flex-cols items-center text-[18px]" onClick={()=>setCurrentView("cooksmeals")}>
              <GiHotMeal className="inline-block mr-2"/><span className={`${sidebarOpen ? "inline-block" : "hidden"}`}>MyMeals</span> 
            </a>}
            
            {localStorage.getItem('Authrole')=='Admin' && <a href="#" className="block py-2 px-4 rounded hover:bg-gray-200 flex flex-cols items-center text-[18px]" onClick={()=>setCurrentView("categories")}>
              <BiSolidCategoryAlt className="inline-block mr-2"/><span className={`${sidebarOpen ? "inline-block" : "hidden"}`}>Categories</span> 
            </a>}

              {localStorage.getItem('Authrole') == 'Admin' && <a href="#" className="block py-2 px-4 rounded hover:bg-gray-200 flex flex-cols items-center text-[18px]" onClick={()=>setCurrentView("reviews")}>
              <MdRateReview className="inline-block mr-2"/><span className={`${sidebarOpen ? "inline-block" : "hidden"}`}>Reviews</span> </a>}

              {localStorage.getItem('Authrole') == 'Admin' &&  <a href="#" className="block py-2 px-4 rounded hover:bg-gray-200 flex flex-cols items-center text-[18px]" onClick={()=>setCurrentView("orders")}>
              <IoReceipt className="inline-block mr-2"/><span className={`${sidebarOpen ? "inline-block" : "hidden"}`}>Orders</span> </a>}

              {localStorage.getItem('Authrole') == 'Cook' &&  <a href="#" className="block py-2 px-4 rounded hover:bg-gray-200 flex flex-cols items-center text-[18px]" onClick={()=>setCurrentView("orderscook")}>
              <IoReceipt className="inline-block mr-2"/><span className={`${sidebarOpen ? "inline-block" : "hidden"}`}>MyOrders</span> </a>}

              {localStorage.getItem('Authrole') == 'Admin' &&  <a href="#" className="block py-2 px-4 rounded hover:bg-gray-200 flex flex-cols items-center text-[18px]" onClick={()=>setCurrentView("promotion")}>
              <LuBadgePercent className="inline-block mr-2"/><span className={`${sidebarOpen ? "inline-block" : "hidden"}`}>Promotion</span> </a>}

              {localStorage.getItem('Authrole') == 'User' && <a href="#" className="block py-2 px-4 rounded hover:bg-gray-200 flex flex-cols items-center text-[18px]" onClick={()=>setCurrentView("myorders")}>
              <IoFastFoodSharp className="inline-block mr-2"/><span className={`${sidebarOpen ? "inline-block" : "hidden"}`}>MyOrders</span> </a>}

          </nav>
        </div>
      </div>

      <div className=" p-1 sm:p-6 h-auto md:min-h-[1000px] overflow-auto w-full">
        {/* Top Bar */}
        <Link to="/" onClick={()=>localStorage.setItem('currentView','dashboard')} className="flex items-center cursor-pointer"><HiHome className="size-5 m-2 md:size-7 inline-block mr-1"/><span className="hidden sm:block md:text-lg">Home</span></Link>
        <div className="flex justify-end items-center mb-6">
          
          <div className="flex items-center space-x-2">
            <User className="w-6 h-6 text-gray-600" />
            <span className="font-medium">{localStorage.getItem("Authname")}</span>
          </div>
        </div>
       {localStorage.getItem("Authrole") == "Cook" && currentView=="cooksmeals" && <div className='flex justify-between mb-[20px] items-start w-full'>
            <button type="button" className="w-[130px] cursor-pointer bg-blue-400 hover:bg-blue-500 text-white py-2 px-3 rounded-sm text-[14px]" onClick={()=>setCurrentView("addmeal")}> <IoMdAdd className="inline-block"/> Add Product</button>
        </div>}
        {currentView == "profile" && <Profile/>}
        {currentView == "cooksmeals" && <Cooksmealstable setCurrentView = {setCurrentView} setEditMealId={setEditMealId} />}
        {currentView =="dashboard" && <Reports/>}
        {currentView == "cookDashboard" && <CookReports/>}
        {currentView =="users" && <Users/>} 
        {currentView == "meals" && <Mealstable setCurrentView = {setCurrentView} setEditMealId={setEditMealId}/>}
        {currentView == "categories" && <Categories/>}
        {currentView == "addmeal" && <Addmeal/>}
        {currentView == "reviews" && <Reviews/>}
        {currentView == "edit" && <Editmeal editmealid={editMealId}/>}
        {currentView == "orders" && <Tomeorder/>}
        {currentView == "orderscook" && <Tomeordercook/>}
        {currentView == "promotion" && <Promotion/>}
        {currentView == "myorders" && <Myorders/>}
      </div>
    </div>
  );
}
