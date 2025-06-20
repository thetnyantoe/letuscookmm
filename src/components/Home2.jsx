import React,{useContext} from 'react'
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import pngwing4 from '../assets/images/pngwing.com (4).png';
import pngwing5 from '../assets/images/pngwing.com (5).png';
import { ToggleContext } from '../pages/ToggleContext';
import { motion } from 'framer-motion';
const testimonials = [
  
    {
      image: 'https://i.pravatar.cc/80?img=1',
      name: 'Alice Johnson',
      review: 'Ordering food was super easy and fast! The delivery was quick and the packaging was perfect. Definitely ordering again!'
    },
    {
      image: 'https://i.pravatar.cc/80?img=2',
      name: 'Mark Lee',
      review: 'I love how user-friendly the platform is. The food was hot and fresh when it arrived. 10/10 experience!'
    },
    {
      image: 'https://i.pravatar.cc/80?img=3',
      name: 'Sophia Tran',
      review: 'A seamless food ordering process from start to finish. The restaurant recommendations were spot on too!'
    },
    {
      image: 'https://i.pravatar.cc/80?img=4',
      name: 'David Kim',
      review: 'The variety of food options available is amazing. I was able to order from my favorite restaurant in just a few taps.'
    },
    {
      image: 'https://i.pravatar.cc/80?img=5',
      name: 'Emily Garcia',
      review: 'The delivery was faster than expected and the food was still warm. Great job keeping everything so smooth.'
    },
    {
      image: 'https://i.pravatar.cc/80?img=6',
      name: 'Liam Smith',
      review: 'Super convenient! I ordered lunch during a busy day at work and it was delivered right on time.'
    },
    {
      image: 'https://i.pravatar.cc/80?img=7',
      name: 'Chloe Adams',
      review: 'The UI is really clean and intuitive. I found what I wanted quickly and checking out was a breeze.'
    },
    {
      image: 'https://i.pravatar.cc/80?img=8',
      name: 'Noah Williams',
      review: 'I’ve used a lot of food delivery services, but this one stands out in terms of speed and reliability.'
    },
    {
      image: 'https://i.pravatar.cc/80?img=9',
      name: 'Mia Thompson',
      review: 'The live tracking feature is awesome. I could see my order being prepared and delivered in real-time!'
    },
  ];


const Home2 = () => {
  const { usePreferredText } = useContext(ToggleContext);
  const text =usePreferredText?'၂၀၂၂ ခုနှစ်မှစတင်၍ ကျွန်ုပ်တို့သည် ယနေ့၊ မနက်ဖြန်နှင့် နှစ်များစွာအထိ လတ်ဆတ်ပြီး အရသာရှိသော အခိုက်အတန့်များကို ဖန်တီးပေးလျက်ရှိပါသည်။':"Since 2022, we've been serving delicious moments that stay fresh today, tomorrow, and for years to come.";
  const words = text.split(' ');
  
  
  return (
    <div className="dark:text-white sora my-[100px] sm:my-[150px] md:my-[200px] relative max-w-[550px] md:max-w-[1300px] mx-auto">
      <img
        src={pngwing4}
        className="hidden md:block float absolute h-[220px] w-[190px] -top-[120px] right-0 z-[-1]"
        alt="Decoration Top Right"
      />
      <img
        src={pngwing5}
        className="float absolute h-[130px] w-[100px] -bottom-[50px] left-[70px] -rotate-50 -z-50"
        alt="Decoration Bottom Left"
      />
      <motion.div className="text-[22px] md:text-[31px] lg:text-[41px]/[60px] font-regular leading-tight text-center max-w-[1000px] mx-auto" initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 3 }} 
        viewport={{ once: true }} >
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{
              delay: index * 0.12,
              type: "spring",
              stiffness: 100,
              damping: 25,
            }}
            viewport={{ once: true }}
            style={{ margin: '0 4px', display: 'inline-block' }}
          >
            {word}
          </motion.span>
        ))}

      </motion.div>

      <section className="sora mt-[70px] md:mt-[230px]">
        <div className="text-white flex flex-col items-center mb-6 text-center">
          <h2 className="text-[23px] sm:text-[32px] lg:text-[52px] font-bold leading-tight text-[#e59d2c]" data-aos="fade-up">
           {usePreferredText ?'အစားအသောက်ချစ်သူတို့ ရဲ့ စကားသံများ':' What Our Foodies Are Saying!'}
          </h2>
          <p className="text-black dark:text-white  font-normal text-[20px] px-6 py-4 mb-3 " data-aos="fade-up">
          {usePreferredText ?'စစ်မှန်သော ဝယ်သူတို့ရဲ့ စစ်မှန်သောစကားသံ':'Real reviews from real taste buds.'}
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 1400, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mx-[80px]"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="p-4 sm:p-8 mx-3 sm:mx-0 w-auto h-[170px] sm:h-[200px] rounded-3xl border border-neutral-200 bg-white">
                <div className="flex md:flex-row items-center">
                  <img
                    src={testimonial.image}
                    className="w-12 h-12 bg-blue-200 rounded-full mr-0 md:mr-4"
                    alt={testimonial.name}
                  />
                  <div className="flex flex-col">
                    <p className="font-black text-black text-lg md:text-xl">{testimonial.name}</p>
                  </div>
                </div>
                <div>
                  <p className="text-black my-4 text-sm md:text-base">"{testimonial.review}"</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  )
}

export default Home2