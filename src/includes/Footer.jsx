import React from 'react'
import {CiLinkedin} from 'react-icons/ci';
import {Link,useLocation} from 'react-router-dom';
import {AiOutlineFacebook} from 'react-icons/ai';
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <>
{/* <img className="inline-block size-[38px]" />  */}
{/* ${location.pathname=='/admin/dashboard'?'w-[1000px]':''} */}
<div className={`bg-black-100 container-fluid mt-50 sora lg:w-full`}>
      <div className="bg-[#262626] text-[#ffffff]">
        <div className="rounded-2xl 2xl:mx-[200px] w-auto p-[20px] pt-[70px]">
          
         
          <div className="grid grid-cols-1 md:grid-cols-2 w-full space-y-4">
            <div className="space-y-5 mb-[50px] md:w-[400px]">
              <h4 className="font-medium text-[20px]/[26px] cursor-pointer" data-aos="fade-up">
                <a href="/">
                  Letuscook
                </a>
              </h4>
              <div className="max-w-[600px] text-white text-[16px]/[20px] md:text-[14px]/[20px]" data-aos="fade-up">
                Get in touch to find out more about food experiences to explore and engage the customers' needs and preferences.
              </div>
            </div>

       
            <div className="md:ml-[30px] 2xl:ml-[200px]">
              <p className="text-[16px] text-white/50 font-normal mb-[25px]">Company</p>
              <div className="space-x-[150px] flex">
                
               
                <div className="flex flex-col space-y-3">
                  
                    <Link to="/" className="text-[14px] cursor-pointer hover:text-yellow-200">
                      Home
                    </Link>

                    <Link to="/meals" className="text-[14px] cursor-pointer hover:text-yellow-200">
                      Meals
                    </Link>

                    <Link to="/cooks" className="text-[14px] cursor-pointer hover:text-yellow-200">
                      Cooks
                    </Link>
                    <Link to="/faqs" className="text-[14px] cursor-pointer hover:text-yellow-200">
                      FAQs
                    </Link>

                  
                </div>

       
                <div className="flex flex-col space-y-3">
                  
                    <Link to="/aboutus" className="text-[14px] cursor-pointer hover:text-yellow-200">
                      About Us
                    </Link>

                    <Link to="/contactus" className="text-[14px] cursor-pointer hover:text-yellow-200">
                      Contact Us
                    </Link>
                    <Link to="/termsandconditions" className="text-[14px] cursor-pointer hover:text-yellow-200">
                      Terms & conditions
                    </Link>

                </div>
              </div>
            </div>
          </div>
 
          <hr className="h-px w-[100%] my-8 bg-gray-100/15 border-0" />

          <div className="grid grid-cols-1 xl:grid-cols-2 w-full space-y-4 2xl:gap-[400px]">
            <p className=" text-[12px] md:text-[14px] text-white/50 md:max-w-[1000px]">&copy; 2025 Letuscook all rights reserved</p>
            <div className="flex space-x-6 xl:justify-self-end" >
              <a href="https://www.linkedin.com/company/tangenc/"><FaXTwitter className="text-white/50 size-[20px]"/></a>
              <a href="https://www.facebook.com/RALPHclth?mibextid=ZbWKwL"><AiOutlineFacebook className="text-white/50 size-[20px]" /></a>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default Footer