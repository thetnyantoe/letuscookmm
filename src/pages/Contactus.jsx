import React,{useContext,useState} from 'react';
import sample from '../assets/images/contactus/sample.webp'
import g1 from '../assets/images/contactus/g1.jpg'
import g2 from '../assets/images/contactus/g2.jpg'
import g3 from '../assets/images/contactus/g3.jpg'
import g4 from '../assets/images/contactus/g4.jpg'
import { ToggleContext } from '../pages/ToggleContext';
import {Link,useLocation} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Contactus() {
  const { usePreferredText } = useContext(ToggleContext);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };


  
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setResponseMsg("");

  try {
    const res = await axios.post(
      "http://localhost:8888/letuscook/backend/dashboard/contact.php",
      form // send data directly like this
    );
    
    setResponseMsg(res.data.message || "Message sent successfully!");
    toast.info(res.data.message || "Message sent successfully!");
  } catch (err) {
    setResponseMsg("An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};
  return (
    <section className="sora grid grid-cols-1 lg:grid-cols-2 h-auto gap-3 p-5 my-[8px]">
      {/* Left Side */}
      <div data-aos="fade-in" className="px-[20px]  bg-cover bg-left bg-no-repeat rounded-3xl flex flex-cols items-end text-start h-[320px] lg:h-[840px]" style={{backgroundImage: `url(${sample})`}}>
        <h1 className="text-[32px] md:text-[42px] lg:text-[63px] text-[#e59d2c] font-normal text-shadow-lg mb-5">{usePreferredText?'ချိတ်ဆက်':'CONTACT US'}</h1>
      </div>

      {/* Right Side */}
      <div className="h-full grid grid-cols-1 lg:grid-cols-2 w-[100%] text-[#e59d2c] gap-3">
        {/* First Section */}
        <div className="w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 h-[100%]">
          <div className="h-auto rounded-xl text-center flex flex-cols items-center mb-[40px] lg:mb-[0px]">
            <div className="mx-auto">
              <h2 className="text-[32px] font-medium mb-[35px]" data-aos="fade-in">{usePreferredText?'ဆက်သွယ်ရန်':'Get In Touch'}</h2>
              <div className="space-y-8">
                <div data-aos="fade-in">
                  <i className="fa-solid fa-phone"></i>
                  <h3 className="inline-block">{usePreferredText?'ဖုန်း':'Phone'}</h3>
                  <p className="text-[15px] text-black dark:text-white font-thin">+123 456 789</p>
                </div>
                <div data-aos="fade-in" className="text-[20px]">
                  <i className="fa-solid fa-envelope"></i>
                  <h3 className="inline-block">{usePreferredText?'အီးမေးလ်':'Email'}</h3>
                  <p className="text-[15px] text-black dark:text-white  font-thin">info@letuscook.co</p>
                </div>
                <div data-aos="fade-in" className="text-[20px]">
                  <i className="fa-brands fa-facebook-f"></i>
                  <h3 className="inline-block">{usePreferredText?'ဖေ့စ်ဘုတ်':'Facebook'}</h3>
                  <p className="text-[15px] text-black dark:text-white  font-thin">facebook.com/letuscook</p>
                </div>
              </div>
            </div>
          </div>

          {/* Second Section */}
          <div className="flex flex-cols items-center mb-[40px] lg:mb-[0px]">
            <div className="mx-auto">
              <div className="grid grid-cols-2 gap-2">
                <img data-aos="fade-in" src={g1} className="inline-block size-[200px] rounded-2xl" alt="" />
                <img data-aos="fade-in" src={g2} className="inline-block size-[200px] rounded-2xl" alt="" />
              </div>
              <div className="mt-[10px] grid grid-cols-2 gap-2">
                <img data-aos="fade-in" src={g3} className="size-[200px] rounded-2xl" alt="" />
                <img data-aos="fade-in" src={g4} className="size-[200px] rounded-2xl" alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div data-aos="fade-in" className="w-auto h-full flex lg:flex-cols items-center mx-auto container">
          <div>
            <div className="text-center lg:text-start">
              <h3  className="text-[35px]/[50px] text-[#e59d2c] font-semibold mb-[10px]">
                {usePreferredText?'လွတ်လပ်စွာ ဆက်သွယ်ပါ။':'Feel free to send our friendly team a message'}
              </h3>
              <p className="text-[14px] text-gray-500 dark:text-[#E6E6E6] mb-[40px] font-normal">
                {usePreferredText?'အောက်ပါ ဖောင်မှတဆင့် ထိရောက်စွာ ဆက်သွယ်ပါ။':'Message us using our online chat system for quick and efficient sinport.'}
              </p>
            </div>
            <div className="max-w-full md:max-w-[490px] space-y-5 mx-auto">

<form onSubmit={handleSubmit} className="max-w-full md:max-w-[490px] space-y-5 mx-auto">
        <div>
          <label htmlFor="name">{usePreferredText ? 'အမည်' : 'Name'}</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-[8px] bg-white text-black p-3 rounded-[10px] w-full border"
          />
        </div>
        <div>
          <label htmlFor="email">{usePreferredText ? 'အီးမေးလ်' : 'Email'}</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-[8px] bg-white text-black p-3 rounded-[10px] w-full border"
          />
        </div>
        <div>
          <label htmlFor="message">{usePreferredText ? 'စာတို' : 'Message'}</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            className="mt-[8px] bg-white text-black p-3 rounded-[10px] w-full h-[90px] border"
          />
        </div>
        <button
          className="bg-[#e59d2c] text-white font-semibold py-3 rounded-[10px] w-full h-[42px] cursor-pointer"
          type="submit"
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <span className="loader border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></span>
              Sending...
            </div>
          ) : usePreferredText ? 'ပို့သည်' : 'Submit'}
        </button>
      </form>
      {/* {responseMsg && (
        <p className="mt-4 text-center text-sm text-green-600">{responseMsg}</p>
      )} */}
              <Link to="/faqs" className='ml-2 underline hover:text-yellow-200'>Frequently asked questions</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
