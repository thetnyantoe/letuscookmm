import React,{useContext} from 'react';
import {Link,useLocation} from 'react-router-dom';
import one from '../assets/images/aboutus/1.jpg'
import two from '../assets/images/aboutus/2.jpg'
import vid from '../assets/videos/aboutus.mp4'
import { ToggleContext } from '../pages/ToggleContext';

const Aboutus = () => {
  const { usePreferredText } = useContext(ToggleContext);
  return (
    <div>
      {/* Section 1 */}
      <section className="my-[52px] relative h-[400px] sm:h-[500px] md:h-[750px] sora max-w-full z-50">
        <img src={one} className="absolute left-0 z-10" alt="" data-aos="fade-up"/>
        <i data-aos="fade-up"
          className={`pl-[60px] pr-[20px] py-[30px] text-[54px]/[30px] sm:text-[140px]/[100px] font-extrabold text-right text-slate-900 dark:text-white w-auto ${usePreferredText?'h-auto xl:h-[400px] ':'h-auto'} absolute right-[50px] lg:right-[100px] xl:right-[150px] top-[60px] lg:top-[100px] xl:top-[200px] z-10 text-right`}
          style={{ backgroundColor: 'rgba(229, 157, 44, 0.45)' }}
        >
          {usePreferredText ? (
              <>
              တို့ <br /> <br /> အကြောင်း
              </>
            ) : (
              <>
                ABOUT <br /> US
              </>
            )}
          
        </i>
        <Link data-aos="fade-up" to="/termsandconditions" className={`cursor-pointer bg-slate-900 dark:bg-white py-[12px] px-[18px] absolute right-[50px] lg:right-[100px] xl:right-[150px] ${usePreferredText?'top-[210px] sm:top-[420px] lg:top-[460px] xl:top-[600px]':'top-[180px] sm:top-[320px] lg:top-[360px] xl:top-[460px]'} z-10 text-[12px] text-white dark:text-black sm:text-[18px]`}>
          {usePreferredText?'စည်းမျဥ်းများ':'Terms & Conditions'}
        </Link>
      </section>

      

      {/* Section 2 */}
      <section className="mx-[20px] md:mx-auto h-screen max-w-[800px] grid grid-cols-3 sora gap-4">
        <div data-aos="fade-up" className="dark:text-white text-[20px] sm:text-[32px] tracking-wider">{usePreferredText?'ဦးတည်ချက်':'OUR MISSION'}</div>
        <div className="col-span-2">
          <p data-aos="fade-up" className="text-start text-[12px] sm:text-[15px] dark:text-white font-thin mb-[35px]">
          {
  usePreferredText ? (
    <>
      Letuscook တွင်၊ အကောင်းဆုံးအစားအစာဆိုသည်မှာ ရိုးရိုးချက်ပြုတ်ထားသည်ထက် ပိုပါသည်။ ၎င်းတို့ကို မေတ္တာ၊ အမှတ်တရများနှင့် စိတ်အားထက်သန်မှုတို့ဖြင့် ဖန်တီးထားခြင်းဖြစ်ပါသည်။
      ကျွန်ုပ်တို့၏ ရည်မှန်းချက်မှာ တတ်မြောက်ကျွမ်းကျင်သော အိမ်တွင်းစားဖိုမှူးများနှင့် စစ်မှန်သော အိမ်လုပ်စားသောက်ဖွယ်များကို တောင့်တနေသူများအကြား ဆက်သွယ်ပေးရန်ဖြစ်သည်။
      ထူးချွန်ထက်မြက်သော စားဖိုမှုးများ အတွက် အမှတ်တံဆိပ်များ မလိုအပ်ကြောင်း သက်သေပြလိုပါသည်။ အစစ်အမှန် အရသာသည် လူသားများ၊ မိသားစုများ၊ ဂရုစိုက်မှုနှင့် ပြည့်ဝသော လက်များမှ မွေးဖွားလာခြင်းဖြစ်သည်။
      <br />
      ကျွန်ုပ်တို့၏ ပလက်ဖောင်းမှတစ်ဆင့် မျှဝေသော အစားအစာတိုင်းတွင် သမိုင်းကြောင်းတစ်ခု ရှိပါသည်။ ၎င်းတို့သည် မျိုးဆက်တစ်ခုမှ တစ်ခုသို့ လက်ဆင့်ကမ်းလာသော ရိုးရာဓလေ့များ၊ ကာလကြာမြင့်စွာ စမ်းသပ်ပြင်ဆင်ထားသော လျှို့ဝှက်ပြုတ်နည်းများ၊ နှင့် မေတ္တာတို့ဖြင့် ပြင်ဆင်ထားသော အစားအစာ၏ ပျော်ရွှင်မှုတို့ကို ပြောပြပါသည်။

      ဒေသခံ စားဖိုမှူးများကို ပံ့ပိုးခြင်းဖြင့်၊ လူမှုအသိုင်းအဝိုင်းများကို အားဖြည့်ကြပါစို့၊ လူတိုင်းအား အိမ်၏စစ်မှန်သောအရသာကို မည်သည့်နေရာတွင်ရှိစေကာမူ ခံစားနိုင်ခွင့် ပေးချင်ပါသည်။
      <br />
      Letuscook သည် အစားအစာမှာယူရေးပလက်ဖောင်း သက်သက်မဟုတ်ပါ။ အိမ်ပြန်ရောက်သလို ခံစားရစေသော အရသာ၊ အမှတ်တရများ၊ နှင့် အိမ်နှင့်တူသော နွေးထွေးမှုကို ဟင်းတစ်ပွဲချင်းစီဖြင့် ဖော်ဆောင်ပေးခြင်းပဲဖြစ်ပါသည်။
    </>
  ) : (
    <>
      At Letuscook, we believe that the best meals aren't just made — they're crafted with love, memories, and passion.
      <br />
      Our mission is to bridge the gap between talented home cooks and people who crave real, authentic, homemade meals.
      <br />
      We are here to prove that food doesn't have to come from big kitchens or faceless brands to be extraordinary — it comes from real people, from families, from hands that care.
      <br />
      Every meal shared through our platform tells a story — of tradition passed down through generations, of secret recipes perfected over time, and of the joy that only a lovingly prepared dish can bring.
      <br />
      By supporting local cooks, we empower communities, celebrate cultural diversity, and offer everyone a chance to experience the true flavors of home — no matter where they are.
      <br />
      Letuscook isn't just about food. It's about belonging, about memories, about feeling at home — one plate at a time.
    </>
  )
}
            
          </p>
          <video autoPlay muted loop className="rounded-sm" data-aos="fade-up">
            <source src={vid} />
          </video>
        </div>
      </section>

      {/* Section 3 */}
      <section data-aos="fade-up" className="relative sora bg-cover bg-center bgr-no-repeat text-white h-[250px] mt-[190px] sm:mt-0 mx-auto max-w-[1300px]" style={{backgroundImage: `url(${two})`}}>
        <div
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', maxWidth: '2000px' }}
          className="absolute flex flex-col justify-around items-center text-center h-[400px] bg-white dark:bg-black text-black dark:text-white mx-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-[70px]" data-aos="zoom-in"
        >
          <div>
            <h2 className="text-[40px] font-bold">34+</h2>
            <p className="font-normal">Cooks</p>
          </div>
          <div>
            <h2 className="text-[40px] font-bold">120+</h2>
            <p className="font-normal">Dishes</p>
          </div>
          <div>
            <h2 className="text-[40px] font-bold">240+</h2>
            <p className="font-normal">Orders</p>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="max-w-[1300px] text-center sora text-white mt-[280px] mx-[10px] sm:mx-[45px] md:mx-[200px] lg:mx-[240px] xl:mx-[330px]">
        {usePreferredText?(<>
          <h2 data-aos="fade-up" className="text-[36px] md:text-[54px] text-[#e59d2c] mb-[40px]">
          <span  className="font-thin">ဘာကြောင့်</span> ကျွန်ုပ်တို့ကို ရွေးချယ်သင့်သလဲ <span className="font-thin">?</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 font-thin text-[12px] md:text-[17px] max-w-[1200px] mx-auto ">
            <div data-aos="fade-up" className="max-w-[300px] shadow-xs shadow-gray-500 px-[50px] py-[40px] tracking-wide text-black dark:text-white">
              သင့်အား မိမိမိသားစုအတွက် ချက်ပြုတ်သကဲ့သို့ပင် - အရသာ၊ ရိုးရာဓလေ့နှင့် ဂရုစိုက်မှုတို့ဖြင့် ပြည့်နှက်နေသော ဒေသခံစားဖိုမှူးများနှင့် ချိတ်ဆက်ပေးပါသည်။  စစ်မှန်သော မေတ္တာဖြင့် ပြုလုပ်ထားသော စစ်မှန်သည့် အစားအစာများသာ။
            </div>
            <div data-aos="fade-up" className="max-w-[300px] shadow-xs shadow-gray-500 px-[50px] py-[40px] tracking-wide text-black dark:text-white">
              သင့်မှာယူမှုတိုင်းသည် အိမ်တွင်းစားဖိုမှူးများကို တိုက်ရိုက်ပံ့ပိုးပါသည်၊ လုပ်ငန်းငယ်များနှင့် ရပ်ရွာအသိုင်းအဝိုင်း တိုးတက်ရေးကို အားပေးပါသည်။ သင်သည် အစားအစာကိုသာ ဝယ်ယူနေခြင်းမဟုတ်ပါ - ပါရမီရှင်တို့်အတွက် ရင်းနှီးမြှုပ်နှံနေခြင်းဖြစ်ပါသည်။
            </div>
            <div data-aos="fade-up" className="max-w-[635px] lg:max-w-[300px] shadow-xs shadow-gray-500 px-[50px] py-[40px] tracking-wide col-span-2 lg:col-span-1 text-black dark:text-white">
              နှစ်သက်ရာ အဆာပြေအစားအစာ၊ ရိုးရာအစားအစာများ သို့မဟုတ် အသစ်အဆန်းများကို လိုချင်နေပါက၊ ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုနှင့် အိမ်တွင်းချက်အစားအစာများအတွက် တိုက်ရိုက်ပို့ဆောင်ပေးပါမည်။ လတ်ဆတ်ပြီး စိတ်နှလုံးကို နွေးထွေးစေမည့် အရသာများ။
            </div>
          </div>
          </>):(<>
            <h2 className="text-[36px] md:text-[54px] text-[#e59d2c] mb-[40px]">
                    <span className="font-thin">Why</span> Choose Us <span className="font-thin">?</span>
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 font-thin text-[12px] md:text-[17px] max-w-[1200px] mx-auto">
                    <div className="max-w-[300px] shadow-xs shadow-gray-500 px-[50px] py-[40px] tracking-wide text-black dark:text-white">
                      We connect you with passionate local cooks who prepare every meal just like they would for their own families
                      — full of flavor, tradition, and care. No mass production. Just real food made with real love.
                    </div>
                    <div className="max-w-[300px] shadow-xs shadow-gray-500 px-[50px] py-[40px] tracking-wide text-black dark:text-white">
                      Every order you place directly supports home-based chefs, encouraging small businesses and community growth.
                      You're not just buying food — you're investing in people.
                    </div>
                    <div className="max-w-[635px] lg:max-w-[300px] shadow-xs shadow-gray-500 px-[50px] py-[40px] tracking-wide col-span-2 lg:col-span-1 text-black dark:text-white">
                      Whether you’re craving comfort food, cultural classics, or something new, our platform brings home-style meals
                      straight to your doorstep. Fresh, handmade, and always heartwarming.
                    </div>
                  </div>
                  </>)}
      </section>
    </div>
  );
};

export default Aboutus;
