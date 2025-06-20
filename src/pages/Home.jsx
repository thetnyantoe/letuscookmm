import React, { useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import mainImage from '../assets/images/main.png';
import mohinga from '../assets/images/Mohinga-Burmalicious.jpeg';
import friedChicken from '../assets/images/friedChicken.jpg';
import teaLeafSalad from '../assets/images/lpt.jpg';
import leaf1 from '../assets/images/leaf1.png';
import leaf2 from '../assets/images/leaf2.png';
import goto2 from '../assets/images/goto2.webp';
import meals from '../assets/images/meals.jpg';
import categories from '../assets/images/categories.jpg';
import pasta from '../assets/images/pasta.jpg';
import bgGif from '../assets/images/ezgif-3a00a969f9aa38.gif';
import backImage from '../assets/images/back.png';
import Home2 from '../components/Home2';
import { ToggleContext } from './ToggleContext';
import "react-toastify/dist/ReactToastify.css";
import { MdArrowForwardIos } from "react-icons/md";

const Home = () => {
  const { usePreferredText,isDarkMode } = useContext(ToggleContext);
  const dishes = [
    {
      name: "Mohinga",
      desc: "Fish meats, thin noodle, onion, add-ons",
      price: "9500 MMK",
      chef: "Daw Cho",
      img: mohinga,
    },
    {
      name: "Fried Chicken",
      desc: "Chicken, Spicy sauce, Crispiness",
      price: "12000 MMK",
      chef: "Sein Sein",
      img: friedChicken,
    },
    {
      name: "Tea Leaf Salad",
      desc: "Fresh tea leaves, fried beans, dried prawn",
      price: "4500 MMK",
      chef: "Htay Htay",
      img: teaLeafSalad,
    },
  ];
  
  return (
    <>
      <div
        className="my-[15px] bg-cover bg-no-repeat rounded-4xl w-auto h-[78.1vh] md:h-[97.1vh] relative flex items-center z-0 mx-[8px] ml-[13px] md:mx-[20px]"
        style={{ backgroundImage: `url(${bgGif})` }}
      >
        <div className="text-white mx-auto sora w-auto tracking-widest text-shadow-lg" data-aos="fade-up">
          <div className="text-start text-[24px] md:text-[30px] mx-[10px] w-[250px] md:w-auto">
            {usePreferredText ? 'စစ်မှန်သော အိမ်ချက်အရသာကို ခံစားလိုက်ပါ။' : 'Enjoy the taste of real home'}
            <h1 className="text-[50px] md:text-[100px]/[100px] lg:text-[160px]/[160px] font-bold text-[#e59d2c]">
              letUsCook
            </h1>
          </div>
          <p className="text-start md:text-center text-[10px] md:text-[14px] font-light ml-[10px] md:mx-auto max-w-[290px] sm:max-w-[800px]">
          {
  usePreferredText 
    ? "ဒါက သာမန် အစားအစာတစ်ခုမဟုတ်ဘဲ ကျွန်ုပ်တို့၏ အစားအစာများကို နွေးထွေးမှုများ လွှမ်းခြုံထားပါတယ် ။\nဂရုစိုက်ပြီး ပြင်ဆင်ထားတာပါ။\nချစ်ခြင်းမေတ္တာနဲ့ ပြုလုပ်ထားတာပါ။\nဘာလို့လဲဆိုတော့ ကိုယ့်မိသားစုကို ကျွေးမွေးသလို ချက်ပြုတ်ထားလို့ပါပဲ။" 
    : "Our meals don’t have to feel this comforting. But they do. It’s not your usual takeaway. It’s made with care. It’s made with love. Maybe that's because we cook like we're feeding our own."
}
          </p>
        </div>
        
      </div>

      {/* Second section */}
      <section className="h-[80vh] sm:h-screen pt-[150px] mb-[100px] sm:mb-[0px]">
        <div
          className="mx-[20px] sm:mx-auto max-w-[540px] md:max-w-[700px] xl:max-w-[1000px] h-[470px] md:h-[650px] bg-yellow-500 rounded-4xl bg-cover bg-left bg-no-repeat relative shadow-2xl" data-aos="fade-up"
          style={{ backgroundImage: `url(${backImage})` }}
        >
          <div className="absolute bottom-[70px] sm:bottom-[120px] left-[25px] sm:left-[70px] max-w-[240px] sm:max-w-[400px] z-60 text-shadow-md">
            <h3 className="text-[#910813]  ml-1" data-aos="fade-up">{usePreferredText?'သင့်အတွက် အထူး':'OUR SPECIALS'}</h3>
            <h1 className="font-medium text-[32px]/[32px] xl:text-[44px]/[62px] text-black" data-aos="fade-up">
            {usePreferredText ? (
              'လတ်ဆတ်မှုဟာ တစ်လုပ်ချင်းစီတိုင်းမှာ'
            ) : (
              <>
                Freshness <br /> in every bite
              </>
            )}

            </h1>
            <p className="font-light dark:text-black mt-4" data-aos="fade-up">
              {usePreferredText?'ဝါရင့် ဟင်းချက်ဝါသနာရှင်များ နဲ့ ကျွမ်းကျင် စားဖိုမှုးကြီးများကို တိုက်ရိုက် Support ကြရအောင်။':'Meet the well-experienced home cooks and professional chefs and support directly.'}
            </p>
            <Link to="/cooks" className="inline-block bg-black text-white text-lg sm:text-2xl py-2 sm:py-4 px-[50px] mt-5 rounded-4xl shadow-2xl cursor-pointer border hover:bg-white hover:text-black hover:border-[1px] hover:border-black" data-aos="fade-up">
              Cooks
            </Link>
          </div>

          <img
            className="absolute top-[-100px] sm:top-[0px] -right-[100px] sm:right-[30px] size-[360px] sm:size-[580px]"
            src={mainImage}
            data-aos="zoom-in"
            data-aos-duration="500"
            alt="Main Dish"
          />
          <img
            className="float absolute bottom-[-40px] right-0 -scale-y-100 rotate-50 w-[280px] h-[160px] hidden md:block" data-aos="fade-up"
            src={leaf1}
            alt=""
          />
          <img
            className="float absolute bottom-[80px] right-[-60px] -scale-y-100 rotate-120 size-[200px] lg:size-[240px] hidden lg:block" data-aos="fade-up"
            src={leaf2}
            alt=""
          />
          <img
            className="float absolute top-[-50px] left-[-45px] -scale-y-100 rotate-220 w-[140px] h-[100px] sm:w-[240px] sm:h-[120px]" data-aos="fade-up"
            src={leaf1}
            alt=""
          />
          <img
            className="float absolute top-[40px] left-[-60px] scale-y-100 rotate-50 size-[140px] sm:size-[180px]" data-aos="fade-up"
            src={leaf2}
            alt=""
          />
        </div>
      </section>

      {/* More sections like meal cards, go-to sections, testimonials, etc. can follow using similar JSX formatting */}
      <section className="pt-12 px-6 xl:px-[160px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish, idx) => (
            <div key={idx} className="h-[360px] sm:h-auto bg-white rounded-3xl shadow-lg overflow-hidden p-[8px] group" data-aos="fade-up"
            data-aos-duration={`400` * `${idx}`}>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={dish.img}
                  alt={dish.name}
                  className="rounded-2xl w-full h-[200px] sm:h-[300px] object-cover group-hover:scale-105 transition duration-400 ease-in-out"
                />
              </div>
              <div className="p-4">
                <h3 className="text-2xl tracking-tight font-semibold dark:text-black">{dish.name}</h3>
                <p className="text-gray-500 text-sm">{dish.desc}</p>
                <p className="mt-2 font-medium dark:text-black">{dish.price}</p>
                <p className="mt-5 text-[14px] text-red-800">{dish.chef}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* goto */}

      <section className="py-12 px-4 lg:px-6 bg-gray-100 dark:bg-[#1a1a1a] shadow-lg rounded-3xl max-w-7xl mx-auto text-white sora my-[120px]">
        <div className="flex flex-col items-start mb-6">
          <h2 className="text-[26px] md:text-[32px] lg:text-[52px] font-bold leading-tight text-[#e59d2c] mb-2" data-aos="fade-up">
            {usePreferredText?'အခြားအရသာများ':'Other Flavors'}
          </h2>
          <p className="text-black dark:text-white font-normal text-[16px] md:text-[20px] py-2 mb-3" data-aos="fade-up">
            {usePreferredText?'ပိုမိုကောင်းမွန်သော အရသာအတွေ့အကြုံများဆီသို့':'Toward better dining experiences'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-5">

            <Link data-aos="fade-up" to="/cooks" className="inline-block relative rounded-2xl overflow-hidden group col-span-2 h-[300px] bg-cover bg-left bg-no-repeat cursor-pointer" style={{backgroundImage:`url(${goto2})`}}>
              <div className="absolute bottom-0 ps-4 text-white text-3xl font-bold group-hover:pb-[150px] group-hover:backdrop-blur-xs group-hover:bg-white/5 duration-200 w-full h-[60px] ">{usePreferredText?'ထူးချွန်သော စားဖိုမှူးများ':'Our Talented Cooks'} <p className='text-[16px] text-gray-200 mt-[30px] font-normal '>{usePreferredText?'သင့်အကြိုက်ဆုံး အရသာများကို ဖန်တီးပေးသော စိတ်အားထက်သန်သည့် စားဖိုမှူးများနှင့် တွေ့ဆုံပါ':'Meet the passionate chefs behind your favorite flavors'}</p></div>
              <div className="absolute top-4 right-4 hidden group-hover:block backdrop-blur-sm bg-white/5 transition duration-200 rounded-full p-2 text-[20px] "><MdArrowForwardIos/></div>
            </Link>

            <Link data-aos="fade-up" to="/meals" className="inline-block relative rounded-2xl overflow-hidden group h-[300px] bg-cover bg-left bg-no-repeat cursor-pointer" style={{backgroundImage: `url(${meals})`}}>
              <div className="absolute bottom-0 ps-4 text-white text-3xl font-bold group-hover:pb-[150px] group-hover:backdrop-blur-xs group-hover:bg-white/5 duration-200 w-full h-[60px] ">{usePreferredText?'အထူးဟင်းလျာများ':'Meals'} <p className='text-[16px] text-gray-200 mt-[30px] font-normal '>{usePreferredText?'ရာသီစာ ကုန်ကြမ်းများဖြင့် ဂရုတစိုက် ပြင်ဆင်ထားသော ကျွန်ုပ်တို့၏ အထူးဟင်းလျာများကို စမ်းသပ်ကြည့်ပါ':'Explore our carefully crafted dishes made with seasonal ingredients'}</p></div>
              <div className="absolute top-4 right-4 hidden group-hover:block backdrop-blur-sm bg-white/5 transition duration-200 rounded-full p-2 text-[20px] "><MdArrowForwardIos/></div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-5">
            <Link data-aos="fade-up" to="/aboutus" className="inline-block relative rounded-2xl overflow-hidden group h-[300px] bg-cover bg-left bg-no-repeat cursor-pointer" style={{backgroundImage: `url(${categories})`}}>
              <div className="absolute bottom-0 ps-4 text-white text-3xl font-bold group-hover:pb-[150px] group-hover:backdrop-blur-xs group-hover:bg-white/5 duration-200 w-full h-[60px] ">{usePreferredText?'ကျွန်ုပ်တို့ အကြောင်း':'Our Story'} <p className='text-[16px] text-gray-200 mt-[30px] font-normal '>{usePreferredText?'ကျွန်ုပ်တို့ အစားအစာတိုင်းတွင် ထည့်သွင်းထားသော ရိုးရာဓလေ့နှင့် မေတ္တာတို့ကို လေ့လာပါ':'Discover the tradition and love that goes into every meal we serve'}</p></div>
              <div className="absolute top-4 right-4 hidden group-hover:block backdrop-blur-sm bg-white/5 transition duration-200 rounded-full p-2 text-[20px] "><MdArrowForwardIos/></div>
            </Link>

            <Link data-aos="fade-up" to="/contactus" className="inline-block relative rounded-2xl overflow-hidden group col-span-2 h-[300px] bg-cover bg-left bg-no-repeat cursor-pointer" style={{backgroundImage: `url(${pasta})`}}>
              <div className="absolute bottom-0 ps-4 text-white text-3xl font-bold group-hover:pb-[150px] group-hover:backdrop-blur-xs group-hover:bg-white/5 duration-200 w-full h-[60px] ">{usePreferredText?'ဆက်သွယ်ရန်':'Get In Touch'} <p className='text-[16px] text-gray-200 mt-[30px] font-normal '>{usePreferredText?'သင့်ထံမှ အကြံပြုချက်များနှင့် မေးမြန်းချက်များကို ကြားရတာ ဝမ်းမြောက်ပါသည်':"We're always happy to hear your feedback and inquiries"}</p></div>
              <div className="absolute top-4 right-4 hidden group-hover:block backdrop-blur-sm bg-white/5 transition duration-200 rounded-full p-2 text-[20px] "><MdArrowForwardIos/></div>
            </Link>
          </div>
        </div>
      </section>
      
      <Home2/>



    </>
  );
};

export default Home;
