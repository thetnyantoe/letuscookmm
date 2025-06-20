import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from 'sweetalert';
import Bannerfoto from "../assets/images/pexel4.jpg"


const Cooks = () => {
  const [users, setUsers] = useState([]);
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    axios.get('http://localhost:8888/letuscook/backend/dashboard/users.php?action=cooksPage')
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, []);
  return (
    <>
    <div
        className="mb-[40px] bg-cover bg-no-repeat w-auto h-[72.1vh] relative flex items-center z-0 mt-[-10px]"
        style={{ backgroundImage: `url(${Bannerfoto})` }}
      >
        <div className="text-white mx-auto sora w-auto tracking-widest text-shadow-lg" >
          <div className="text-start text-[30px] mx-[10px]" data-aos="fade-in">
            Bringing Homemade <span className='underline'>Goodness</span> to You
            <h1 className="text-[50px] md:text-[100px]/[100px] lg:text-[160px]/[160px] font-bold text-[#e59d2c]" data-aos="fade-in" data-aos-duration="1000">
              letUsCook
            </h1>
          </div>
          <p className="text-start md:text-center text-[10px] md:text-[14px] font-light ml-[10px] md:mx-auto max-w-[750px] md:max-w-[800px]" data-aos="fade-up">
            Skip the kitchen and order freshly made meals by passionate homecooks. Delicious, comforting, and delivered to your door — just like how mom makes it.
          </p>

        </div>
    </div>

    {/* start */}
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[200px] sm:max-w-[820px] md:max-w-[1400px] gap-5 gap-y-15 mx-7 sm:mx-[60px] xl:mx-auto'>
      {users.map((user)=>(
        <div className='relative bg-stone-50 dark:bg-[#20202a] shadow-lg w-[330px] h-[190px] xl:w-[400px] xl:h-[220px] rounded-xs group cursor-pointer ' data-aos="fade-up">
        <img src={
                    user.avatar
                      ?`http://localhost:8888/letuscook/backend/images/users/${user.avatar}`
                        : 'http://localhost:8888/letuscook/backend/images/users/default.jpg'
                  } className='absolute top-[-20px] left-[-20px] h-[150px] w-[130px] xl:h-[200px] xl:w-[180px] border border-stone-50 dark:border-[#121212] border-lb-[1px] rounded-sm group-hover:scale-103 duration-200 ease-in-out' alt="" />
        <div className='absolute right-5 xl:right-10 top-5 '>
          <p className=' text-[20px] font-medium mb-1 text-yellow-600'>{user.username}</p>
          <p className='text-black dark:text-gray-400 text-[13px]'>{user.email}</p>
          <p className='text-gray-400 text-[13px] mb-6'>{user.phone}</p>

          <p className='w-[190px] text-[13px]/[14px] line-clamp-3 overflow-hidden text-black dark:text-gray-200'>
            {user.bio}
          </p> 
        </div>
        <div className='absolute bottom-1 flex justify-between w-full'>
          <p className='ml-2 text-[13px] text-red-800'>{user.meals_count} Cooked</p>
          <p className='mr-2 text-[13px] text-black dark:text-gray-200 '>{user.address}</p>
        </div>
      </div>
      ))}
    </div>
    </>
  )
}

export default Cooks