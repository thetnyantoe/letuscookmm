import React, { useState } from 'react';
import axios from 'axios';
 import foto from '../../../assets/images/forgotpw1.png';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate} from 'react-router-dom';

export default function VerifyOTP() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState("");

  const verify = async () => {
    const email = localStorage.getItem("email");
    try {
      const res = await axios.post("http://localhost:8888/letuscook/backend/authentication/verify_otp.php", { email, otp });
      if (res.data.status === "success") {
        toast.success(res.data.message)
        navigate('/login/resetpassword')
      }else{
        toast.error("Not matched OTP")
      }
    } catch {
      toast.error("OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
    <div className="py-6 px-4">
      <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
      <div className="max-md:mt-8">
          <img src={foto} className="w-full max-md:w-4/5 mx-auto block object-cover" alt="login img" />
        </div>
        <div className="border border-slate-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
          <form className="space-y-6" onSubmit={(e)=>{e.preventDefault(); verify();}}>
            <div className="mb-6">
              <h3 className="text-[#e59d2c] text-3xl font-semibold">Enter OTP</h3>
              <p className="text-slate-500 text-sm mt-6 leading-relaxed">Use the OTP code sent to your email from LetUsCook team.</p>
            </div>

            <div>
              <label className="text-[#e59d2c] text-sm font-medium mb-2 block">Received OTP</label>
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  required
                  className="w-full text-sm text-[#e59d2c] border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-[#e59d2c]"
                  placeholder="Enter user name"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </div>


            <div className="!mt-12">
              <button
                type="submit"
                className="cursor-pointer w-full shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-white bg-[#e59d2c] hover:bg-white hover:text-[#e59d2c] focus:outline-none"
              >
               Submit
              </button>
            </div>
          </form>
        </div>

        
      </div>
    </div>
  </div>

    
  );
}
