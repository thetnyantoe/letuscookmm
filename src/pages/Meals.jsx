import React, { useEffect, useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { Range } from 'react-range';
import axios from 'axios';
import { toast } from "react-toastify";
import { Menu, X, User } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { PiChefHatBold } from "react-icons/pi";
import Eachorder from '../components/Eachorder';
import { CiShoppingCart } from "react-icons/ci";
import { BsBasket } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import Bannerfoto from "../assets/images/pexels1.jpg"
import Kbzimage from "../assets/images/payment/kbz.png"
import Waveimage from "../assets/images/payment/wavepay.png"
import Ayapay from "../assets/images/payment/ayapay.jpg"
import Uab from "../assets/images/payment/Uab.jpg"
import { LuChefHat } from "react-icons/lu";
import { AiOutlineSortAscending } from "react-icons/ai";
import { AiOutlineSortDescending } from "react-icons/ai";
import { CiFilter } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaCheckCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Discountfoto from '../assets/images/sun-tornado.png'
import { ToggleContext } from '../pages/ToggleContext';

const Meals = () => {
  const { usePreferredText } = useContext(ToggleContext);
  const STEP = 1000;
  const MIN = 2000;
  const MAX = 100000;
  const [cooks, setCooks] = useState([]);
  const [sortOrder, setSortOrder] = useState(''); 
  const [searchText, setSearchText] = useState('');
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedCooks, setCheckedCooks] = useState([]);
  const [checkedRatings, setCheckedRatings] = useState([]);
  const [values, setValues] = useState([2000, 100000]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [meals, setMeals] = useState([]);
  const [meal, setMeal] = useState(null);
  const [review, setReview] = useState([]);
  const [avgRating,setAvgRating] = useState();
  const [orderListOpen, setOrderListOpen] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [paymentWindow,setPaymentWindow] =useState(false);
  const [alsolikeWindow,setAlsolikeWindow] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const [redeemInput, setRedeemInput] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");
  const [user,setUser] = useState({});
  const [note,setNote] = useState("");
  const[deliveryType,setDeliveryType] = useState("");
  const [currentBasket, setCurrentBasket] = useState(() => {
    const savedBasket = localStorage.getItem('letuscook_basket');
    return savedBasket ? JSON.parse(savedBasket) : [];
  });
  const [itemCount, setItemCount] = useState(() => {
    const savedBasket = localStorage.getItem('letuscook_basket');
    return savedBasket ? JSON.parse(savedBasket).length : 0;
  });
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [payment,setPayment] = useState();
  const [userId, setUserId] = useState(null);

  const [randomMeals, setRandomMeals] = useState([]);
  useEffect(() => {
    if (meals.length > 0) {
      const shuffled = [...meals].sort(() => 0.5 - Math.random()).slice(0, 4);
      setRandomMeals(shuffled);
    }
  }, [meals]);

useEffect(() => {
  const storedId = localStorage.getItem('Authid');
  if (storedId) {
    setUserId(storedId);
  }
}, []);

  useEffect(() => {
    fetchMeals();
    fetchOptions();
    axios.get('http://localhost:8888/letuscook/backend/dashboard/profile.php',{
        params: {
          userid: localStorage.getItem('Authid')
        }
      })
      .then((response) => {
        console.log(response.data[0])
        setUser(response.data[0]);
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
    
  }, []);
  
  
  
  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = localStorage.getItem('Authid');
      if (!userId) return;

      try {
        const response = await axios.get(`http://localhost:8888/letuscook/backend/dashboard/favorite.php`, {
          params: { user_id: userId }
        });
        setFavoriteMeals(response.data); 
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    fetchFavorites();
  }, [favoriteMeals]);
  
  useEffect(() => {
    console.log("Updated basket:", currentBasket);
    localStorage.setItem('letuscook_basket', JSON.stringify(currentBasket));
  }, [currentBasket]);
  
  const fetchOptions = async () => {
    try {
      const res = await axios.get('http://localhost:8888/letuscook/backend/dashboard/meals.php?action=option');
      if (res.data && Array.isArray(res.data.statusOptions) && Array.isArray(res.data.categoryOptions)) {
        setCategories(res.data.categoryOptions);
      }
      if (Array.isArray(res.data.cookOptions)) {
        setCooks(res.data.cookOptions);
      }
    } catch (err) {
      console.error('Error fetching options:', err);
    }
  };

  const removeFromBasket = (id) => {
    setCurrentBasket(prev => {
      const newBasket = prev.filter(item => item.id !== id);
      localStorage.setItem('letuscook_basket', JSON.stringify(newBasket));
      return newBasket;
    });
    setItemCount(prev => prev - 1);
  };

  const fetchMeals = async () => {
    try {
      const res = await axios.get('http://localhost:8888/letuscook/backend/dashboard/meals.php');
      const data = res.data;
      if (data && Array.isArray(data.meals)) {
        setMeals(data.meals);
      
      } else {
        setMeals([]); 
        console.error('Invalid products format:', data.meals);
      }
    } catch (err) {
      console.error('Error fetching meals:', err);
    }
  };

  const fetchEachMeal = async (mealid)=>{
    try {
      const res = await axios.get('http://localhost:8888/letuscook/backend/dashboard/popup.php',{
        params: {
          mealid: mealid
        }
      });
      const data = res.data;
      if (data) {
        setMeal(data.meal);
        setReview(data.comments)
        setAvgRating(data.average_rating)
        setCommentCount(data.review_count)
        console.log(data.meal);
        console.log(data.comments);
      } else {
        setMeal([]);
        console.error('Invalid products format:', data.comments);
      }
    } catch (err) {
      console.error('Error fetching meals:', err);
    }
  }
  
  const handleReviewSubmit = async (e,mealid) => {
    e.preventDefault();

    if (rating === 0 || comment.trim() === '') {
      alert("Please add a comment and rating!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8888/letuscook/backend/dashboard/popup.php', {
        user_id: localStorage.getItem('Authid'),
        meal_id: mealid,
        rating: parseInt(rating),
        comment: comment.trim(),
      });

      if (response.data.status === 'success') {
        toast.success("Review submitted successfully!")
        fetchEachMeal(mealid)
        setComment('');
        setRating(0);
      } else {
        toast.error("Error occurs")
      }
    } catch (error) {
      console.error(error);
      alert('Server error.');
    }
  };
  const basketSubtotal = currentBasket.reduce((total, item) => total + (item.price * item.count), 0);
  const totalWithFee = basketSubtotal*1.05;
  const finalTotal = totalWithFee - (totalWithFee * discountPercent / 100);
  const updateItemCount = (id, newCount) => {
    setCurrentBasket(prev => {
      const updatedBasket = prev.map(item =>
        item.id === id ? { ...item, count: newCount } : item
      );
      localStorage.setItem('letuscook_basket', JSON.stringify(updatedBasket));
      return updatedBasket;
    });
  };

  const handleBuy = () => {
    const requestData = {
        action: 'stepone',
        payment: payment,
        address: user.address,
        phone:user.phone,
        customer_name:user.username,
        note: note,
        deliveryType:deliveryType,
        customerid: localStorage.getItem("Authid"),
        totalprice: finalTotal,
        ...currentBasket.map(item => ({
            id: item.id,
            count: item.count,
            price: item.price
        }))
    };
    axios.post('http://localhost:8888/letuscook/backend/dashboard/buy.php', requestData, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (response.data.status === 'success') {
          toast.success("Order placed successfully!");
          setCurrentBasket([]);
          localStorage.removeItem('letuscook_basket'); 
          setItemCount(0);
          setOrderListOpen(false);
          setPaymentWindow(false);
          setNote("");

          const receiptUrl = response.data.receipt_url;

          Swal.fire({
            
            title: 'Order Placed!',
            text: 'Do you want to download your receipt?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Download Receipt',
            cancelButtonText: 'Continue',
          }).then((result) => {
            if (result.isConfirmed) {
              window.open(receiptUrl, '_blank');
            }else{
              setAlsolikeWindow(true);
            }
          });
        } else {
            toast.error(response.data.message || "Failed to place order");
        }
    })
    .catch(error => {
        console.error('Error placing order:', error);
        toast.error(error.response?.data?.message || "Error placing order");
    });
}


  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const applyFilters = async (sort = sortOrder) => {
    try {
      const params = new URLSearchParams();
  
      if (checkedCategories.length > 0) {
        params.append('categories', checkedCategories.join(','));
      }
  
      if (checkedCooks.length > 0) {
        params.append('cooks', checkedCooks.join(','));
      }
  
      params.append('priceMin', values[0]);
      params.append('priceMax', values[1]);
  
      if (checkedRatings.length > 0) {
        params.append('ratings', checkedRatings.join(','));
      }
  
      if (searchText.trim() !== '') {
        params.append('search', searchText.trim());
      }
  
      if (sort) {
        params.append('sort', sort);
        setSortOrder(sort);
      }
  
  
      const res = await axios.get(`http://localhost:8888/letuscook/backend/dashboard/filter.php?${params.toString()}`);
      const data = res.data;
      if (data && Array.isArray(data.meals)) {
        setMeals(data.meals);
      } else {
        setMeals([]);
        console.error('Invalid meals format:', data.meals);
      }
    } catch (error) {
      console.error('Error fetching filtered meals:', error);
    }
  };
  
  
  const addFavorite = async (mealId) => {
    const alreadyFavorited = favoriteMeals.some(fav => fav.meal_id === mealId);
    if (alreadyFavorited) {
      toast.info('Meal is already in your favorites.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8888/letuscook/backend/dashboard/favorite.php', {
        user_id: localStorage.getItem('Authid'),
        meal_id: mealId
      });
  
      if (response.data.status === 'success') {
        toast.success('Meal Added to Favorite!');
        setFavoriteMeals(prev => [...prev, { meal_id: mealId }]);
      } else if (response.data.status === 'exists') {
        toast.info('Meal is already in favorites.');
      } else {
        toast.error('Failed to add favorite.');
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
      toast.error('Server error.');
    }
  };

  const removeFavorite = async (mealId) => {
    try {
      const response = await axios.post('http://localhost:8888/letuscook/backend/dashboard/favorite.php', {
        user_id: localStorage.getItem('Authid'),
        meal_id: mealId,
        action: 'remove'
      });
  
      if (response.data.status === 'success') {
        toast.success('Removed from favorites');
        setFavoriteMeals(prev => prev.filter(fav => fav.meal_id !== mealId));

      } else {
        toast.error('Failed to remove favorite');
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Server error.');
    }
  };

  const handleRedeemcode = async () => {
    try {
      const res = await axios.post("http://localhost:8888/letuscook/backend/dashboard/redeemcode.php", {
        code: redeemInput,
        action: 'claim'
      });
  
      if (res.data.success) {
        setDiscountPercent(res.data.percent);
        setErrorMsg("");
      } else {
        setDiscountPercent(0);
        setErrorMsg(res.data.error);
      }
    } catch (err) {
      setDiscountPercent(0);
      setErrorMsg("Network error");
    }
  };
  
  return (
    <>
    <div className={`text-white p-4 sm:p-5 rounded-[40px] sm:rounded-[50px] border-white border-[2px] size-[60px] sm:size-[92px] cursor-pointer fixed z-[70] right-5 bottom-5 bg-gray-900 hover:bg-gray-800 ${itemCount > 0 ? 'block' : 'hidden'} ${orderListOpen ? 'hidden' : 'block'}`} onClick={() => setOrderListOpen(true)}>
        <div className='absolute top-[-5px] rounded-md left-[-10px] bg-[#e59d2c] px-3'>{itemCount}</div>
        <BsBasket className='text-white text-2xl md:text-5xl'/>
    </div>

    <div
        className="mb-[40px] bg-cover bg-no-repeat w-auto h-[72.1vh] relative flex items-center z-0"
        style={{ backgroundImage: `url(${Bannerfoto})` }}

      >
      <div
  className='w-full absolute top-0 flex justify-around py-2'
  style={{
    backgroundImage: `url(${Discountfoto})`,

  }}
>
  <div className='text-shadow-sm text-[10px] sm:text-[16px]'>Enjoy redeem code - <span className='bg-black text-white rounded-sm p-2 font-medium'>6RY244 (10%)</span> availabe until <u>20.6.2025</u></div>

</div>

        <div className="text-white mx-auto sora w-auto tracking-widest text-shadow-lg">
          <div className="text-start text-[26px] sm:text-[30px] mx-[10px]" data-aos="fade-in">
          {usePreferredText ? (
              <>
              နွေးထွေးသော <span className='underline'>အရသာများ</span>
              </>
            ) : (
              <>
                Bringing Homemade <span className='underline'>Goodness</span> to You
              </>
            )}
            
            <h1 className="text-[50px] md:text-[100px]/[100px] lg:text-[160px]/[160px] font-bold text-[#e59d2c]" data-aos="fade-in" data-aos-duration="1000">
              letUsCook
            </h1>
          </div>
          <p className="text-start md:text-center text-[10px] md:text-[14px] font-light ml-[10px] md:mx-auto max-w-[350px] sm:max-w-[800px]" data-aos="fade-up">
            {usePreferredText?'မီးဖိုချောင်မဝင်ပါနဲ့။ စိတ်အားထက်သန်တဲ့ အိမ်ရှင်မတွေရဲ့ လတ်လတ်ဆတ်ဆတ် ပြင်ဆင်ထားတဲ့ အစားအစာတွေကို အခုပဲ မှာယူလိုက်ပါ။ အရသာရှိ၊ စိတ်ကျေနပ်ဖွယ်ရာ ဖြစ်ပြီး သင့်အိမ်အထိ ပို့ဆောင်ပေးမည် - မိခင်လုပ် အိမ်စာလိုပါပဲ။':'Skip the kitchen and order freshly made meals by passionate homecooks. Delicious, comforting, and delivered to your door — just like how mom makes it.'}
          </p>

      <div className='absolute bottom-2 left-1/2 -translate-x-1/2'> 
        <div class="flex items-center max-w-xl mx-auto">  
          <button className='flex bg-[#e59d2c] text-white px-4 py-2 rounded-sm mx-2 cursor-pointer  hover:bg-orange-500' onClick={toggleSidebar}><CiFilter className='text-[24px] inline-block'/><span className='tracking-wider'>Filter</span></button> 

          <button 
            onClick={() => applyFilters('asc')}
            className={`${sortOrder=='asc'?'bg-[#e59d2c]':''} border border-[#e59d2c] text-white px-4 py-2 rounded-sm mx-1 cursor-pointer hover:bg-[#e59d2c] hidden sm:block`}>
            <AiOutlineSortAscending className='text-[24px]' />
          </button>

          <button 
            onClick={() => applyFilters('desc')}
            className={`${sortOrder=='desc'?'bg-[#e59d2c]':''} border border-[#e59d2c] text-white px-4 py-2 rounded-sm mx-1 mr-4 cursor-pointer hover:bg-[#e59d2c] hidden sm:block`}>
            <AiOutlineSortDescending className='text-[24px]' />
          </button>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              applyFilters();
            }} 
            className='flex items-center max-w-xl mx-auto'
          >
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 z-100 start-0 flex items-center pointer-events-none">
                <LuChefHat />
              </div>
              <input 
                type="text" 
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ps-4 sm:ps-10 p-2.5 w-[200px] sm:w-[300px]"
                placeholder="Search meal, cook, category..." 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-[#e59d2c] p-3 ms-2 text-sm font-medium text-white rounded-lg cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>

        </div>
      </div>

        </div>
    </div>

  <div className="relative">
  {/* Sidebar */}
  <div
    className={` fixed top-0 left-0 h-screen w-80 bg-gray-950 text-white transform transition-transform duration-300 z-50 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}
  >
    <div className="h-full overflow-y-auto pr-2 hide-scrollbar">
      <h2 className="text-xl font-bold mb-4 p-3 bg-slate-800 m-2 rounded-sm">Filter</h2>
      
      {/* Category */}
      <ul className='bg-slate-800 rounded-sm m-2 mb-3 p-3'>
        <h3 className='text-[20px] mb-4 text-[#fff8e0]'>Category</h3>
        {categories.map((category) => (
          <li key={category.id} className="py-2 my-1 flex items-center">
            <input
              type="checkbox"
              value={category.id}
              id={`category-${category.id}`}
              checked={checkedCategories.includes(category.id)}
              onChange={(e) => {
                const id = category.id;
                if (e.target.checked) {
                  setCheckedCategories(prev => [...prev, id]);
                } else {
                  setCheckedCategories(prev => prev.filter(c => c !== id));
                }
              }}
              className="cursor-pointer size-[17px] appearance-none checked:appearance-auto bg-gray-300 checked:rounded-sm checked:accent-yellow-400 border-gray-500 rounded-sm"
            />
            <label htmlFor={`category-${category.id}`} className="text-red-500 text-[17px] ml-2">{category.category_name}</label>
          </li>
        ))}
      </ul>

      {/* Cook */}
      <ul className='bg-slate-800 rounded-sm m-2 mb-3 p-3'>
        <h3 className='text-[20px] mb-4 text-[#fff8e0]'>Cook</h3>
        {cooks.map((cook) => (
          <li key={cook.user_id} className="py-2 my-1 flex items-center">
            <input
              type="checkbox"
              value={cook.user_id}
              id={`cook-${cook.user_id}`}
              checked={checkedCooks.includes(cook.user_id)}
              onChange={(e) => {
                const id = cook.user_id;
                if (e.target.checked) {
                  setCheckedCooks(prev => [...prev, id]);
                } else {
                  setCheckedCooks(prev => prev.filter(c => c !== id));
                }
              }}
              className="cursor-pointer size-[17px] appearance-none checked:appearance-auto bg-gray-300 checked:rounded-sm checked:accent-yellow-400 border-gray-500 rounded-sm"
            />
            <label htmlFor={`cook-${cook.user_id}`} className="text-red-500 text-[17px] ml-2">{cook.username}</label>
          </li>
        ))}
        <li className="py-2 my-1 flex items-center">
          <input type="checkbox" className="cursor-pointer size-[17px]" />
          <span className="text-red-500 text-[17px] ml-2">Home</span>
        </li>
      </ul>

      {/* Price */}
      <ul className='bg-slate-800 rounded-sm m-2 p-3 mb-3'>
        <h3 className='text-[20px] mb-4 text-[#fff8e0]'>Price</h3>
        <div className="w-full px-4">
          <div className="flex justify-between text-sm mb-2">
            <span>{values[0]} MMK</span>
            <span>{values[1]} MMK</span>
          </div>
          <Range
            step={STEP}
            min={MIN}
            max={MAX}
            values={values}
            onChange={setValues}
            renderTrack={({ props, children }) => {
              const [min, max] = values;
              const percentage = (val) => ((val - MIN) / (MAX - MIN)) * 100;
              return (
                <div
                  {...props}
                  className="h-1 w-full bg-gray-300 rounded relative"
                >
                  <div
                    className="absolute top-0 h-full bg-blue-500 rounded"
                    style={{
                      left: `${percentage(min)}%`,
                      width: `${percentage(max) - percentage(min)}%`,
                    }}
                  />
                  {children}
                </div>
              );
            }}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="size-3 bg-white border-2 border-blue-500 rounded-full shadow-md"
              />
            )}
          />
        </div>
      </ul>

      {/* Rating */}
      <ul className='bg-slate-800 rounded-sm m-2 p-3 mb-3'>
        <h3 className='text-[20px] mb-4'>Rating</h3>
        {[1, 2, 3, 4, 5, 0].map((rating) => (
          <li key={rating} className="inline-block py-2 my-1 flex items-center">
            <input type="checkbox" id={`rating-${rating}`} checked={checkedRatings.includes(rating)}
            onChange={(e) => {
              if (e.target.checked) {
                setCheckedRatings(prev => [...prev, rating]);
              } else {
                setCheckedRatings(prev => prev.filter(r => r !== rating));
              }
            }} className="hidden peer" />
            <label
              htmlFor={`rating-${rating}`}
              className="ml-1 text-[17px] text-yellow-100 px-11 py-1 border border-transparent rounded-[3px] cursor-pointer border-zinc-400 border-[0.3px] flex items-center peer-checked:text-yellow-500"
            >
              {rating} <FaStar className='inline-block ml-1 mb-[0.5px]' />
            </label>
          </li>
        ))}
      </ul>

      <button onClick={applyFilters} className='w-[295px] py-1 rounded-[4px] bg-yellow-600 mx-2 cursor-pointer'>Apply Filter</button>
    </div>
  </div>

  {/* Overlay */}
  {isOpen && (
    <div
      className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-40"
      onClick={toggleSidebar}
    ></div>
  )}
</div>


      <div className="grid grid-cols-4">
        <div className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-y-3 gap-x-2 sm:gap-5 ${orderListOpen ? 'col-span-3 hidden xl:grid' : 'col-span-4 mx-3 sm:mx-[100px] md:mx-2 lg:mx-5 xl:mx-[140px]'}`}>
          {meals.map((meal, index) => (
            <div
              key={meal.id || index}
              className="bg-slate-100 dark:bg-[#20202a] relative rounded-2xl shadow-lg overflow-hidden p-[6px] sm:p-[8px] group max-h-[250px] md:max-h-[310px] lg:max-h-[360px] w-[175px] md:w-[240px] lg:w-[290px] cursor-pointer"
              onClick={()=>{setPopUp(true); fetchEachMeal(meal.id)}}
            >
              <div className="relative overflow-hidden rounded-md lg:rounded-2xl" >
              
              {favoriteMeals.includes(meal.id)?<FaHeart
                className='absolute z-[10] right-4 top-2 size-[25px] duration-150 mr-[-5px] cursor-pointer hover:scale-120 mb-[-5px]
                  text-red-400 hover:text-red-400'
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(meal.id);
                }}
              />:<CiHeart
                className='absolute z-[10] right-4 top-2 size-[30px] duration-150 mr-[-5px] cursor-pointer hover:scale-120 mb-[-5px]
                  text-zinc-300 hover:text-red-400'
                onClick={(e) => {
                  e.stopPropagation();
                  addFavorite(meal.id);
                }}
              />}

                <img
                  src={`http://localhost:8888/letuscook/backend/images/meals/${meal.image}` || "https://hsaba.com/wp-content/uploads/2013/07/traditionalfishnoodlesoup.jpg"}
                  alt={meal.name || "Meal"}
                  className="rounded-md lg:rounded-2xl w-full h-[110px] md:h-[140px] lg:h-[178px] object-cover group-hover:scale-105 transition duration-400 ease-in-out"
                />
              </div>
              <div className="mx-[5px] sm:mx-[20px] mt-[12px]">
                <div className="flex w-full justify-between items-end">
                  <h3 className="text-md sm:text-xl dark:text-white tracking-tight font-semibold">
                    {meal.name || "Tomato pasta"}
                  </h3>
                  
                </div>
                <i className="text-gray-500 text-[10px] sm:text-sm">{meal.cook_name || "MaAye"}</i>
                <div className=" flex items-center justify-between h-[10px] md:h-[30px] lg:h-[50px] ">
                  <div className="font-medium text-[#e59d2c] text-[12px] sm:text-[17px]">
                    {meal.price ? `${meal.price.toLocaleString()} MMK` : "5,000 MMK"}
                  </div>
                  <div className='flex items-center'>
                    <div className="inline-block size-[7px] rounded-[3.5px] bg-green-600 text-white "></div><span className='text-[10px] sm:text-[12px] dark:text-white ml-1'>{meal.status}</span>
                  </div>
                </div>
                <div className='flex items-center justify-between mt-[10px]'>
                <div className='text-zinc-500 text-[12px]'>
                    {meal.available_qty} <span className='hidden lg:block'>items left</span>
                  </div>
                {localStorage.getItem('Authrole') == 'User' && <button 
                    className="flex items-center border-[#b87f27] border-[1px] w-[60px] sm:w-[100px] font-medium px-5 sm:px-9 text-center py-2 cursor-pointer rounded-[5px] mr-0 sm:mr-[-5px] hover:bg-[#b87f27]  hover:border-none text-[#b87f27] hover:text-white group" 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      if (meal.available_qty < 1) {
                        toast.error("This item is out of stock!");
                        return;
                      }

                      const exists = currentBasket.find(item => item.id === meal.id);
                      if (exists) {
                        return;
                      }

                      setCurrentBasket(prev => [
                        ...prev, 
                        { 
                          id: meal.id, 
                          name: meal.name, 
                          count: 1, 
                          price: meal.price, 
                          image: meal.image,
                          quantity: meal.available_qty 
                        }
                      ]);
                      
                      setItemCount(count => count + 1);
                    }}
                  >
                    <CiShoppingCart className='text-center  inline-block text-md sm:text-2xl font-bold '/>
                </button>}

                </div>
              </div>
            </div>
          ))}
        </div>

        {orderListOpen && <div className='size-[100px] w-[300px] sm:w-[520px] md:w-[600px] lg:w-[700px] xl:w-auto mt-[10px] mx-[18px] sm:mx-[20px] md:mx-[100px] lg:mx-[180px] xl:mx-0 h-full rounded-md'>
          
          <div className='flex justify-between w-full '>
            
            <div>
              <h1 className='text-[32px] font-medium text-gray-800 dark:text-white '>Basket</h1> 
              <p className='text-neutral-500'>{localStorage.getItem('Authname')}</p>
            </div>
            <div>
            <X className='text-gray-300 cursor-pointer' onClick={()=>setOrderListOpen(false)}/>
            </div>
          </div>
          

          
          <div className="mt-[20px] space-y-3 w-[350px] h-[450px] overflow-y-auto overflow-x-hidden hide-scrollbar w-full">
          {currentBasket.map((item, index) => (
              <Eachorder key={index} currentbasketitem={item} removeFromBasket={removeFromBasket} updateItemCount={updateItemCount}/>
            ))}
          </div>

          <div className='mt-[35px] rounded-md p-5 pt-6 bg-stone-100 shadow-lg dark:bg-[#20202a]  md:w-full lg:w-full h-auto md:ml-0'>
              <div className='space-y-5 text-[14px]'>
                <div className='flex justify-between text-neutral-500'><p>Sub Total</p>
                <p>{basketSubtotal.toLocaleString()} Ks</p></div>
                <div className='flex justify-between text-neutral-500'><p>Tax rate</p> <p className='w-[55px] text-neutral-600'/>5%</div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleRedeemcode();
                  }}
                  className='flex justify-between text-neutral-500'
                >
                  <label htmlFor='redeemcode'>Redeem code</label>
                  <input
                    id="redeemcode"
                    type="text"
                    value={redeemInput}
                    onChange={(e) => setRedeemInput(e.target.value)}
                    className='w-[55px] border-b-1 border-neutral-500'
                  />
                  <button type="submit" className='hidden'></button>
                </form>
                {discountPercent != 0 && <p className="text-green-300">-{discountPercent}% </p>}
                {errorMsg && <p className="text-red-500">{errorMsg}</p>}

                <div className='w-full h-[0.2px] bg-neutral-700'></div>
                <div className='flex justify-between text-black dark:text-white'><p>Total</p>
                <p>{finalTotal.toLocaleString()} Ks</p></div>
              </div>
              {
                localStorage.getItem('Loggedin') == 'true' ? (
                  <button
                    className="cursor-pointer mt-[30px] bg-[#e59d2c] text-center w-full rounded-sm text-[15px] font-semibold py-3 text-white"
                    onClick={() => setPaymentWindow(true)}
                  >
                    Continue
                  </button>
                ) : (
                  <Link to="/login"
                    className="block cursor-pointer mt-[30px] bg-[#e59d2c] text-center w-full rounded-sm text-[15px] font-semibold py-3 text-white"
                    onClick={() => setPaymentWindow(true)}
                  >
                    LogIn first for ordering
                  </Link>
                )
              }
          </div>
        </div>}
      </div>

      {popUp && 

      <div id="default-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-10 flex flex-col justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[rgba(0,0,0,0.5)]" onClick={()=>setPopUp(false)}>
          <div className="relative p-4 w-full max-w-7xl max-h-full mx-auto" >

              <div className="bg-[#20202a] text-white rounded-lg shadow-sm z-50 p-3 max-w-[900px] mx-auto" onClick={(e) => e.stopPropagation()} >

                  <div className="flex items-center justify-between rounded-t ">
                      <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={()=>setPopUp(false)}>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span className="sr-only">Close modal</span>
                      </button>
                  </div>

                  {meal && (
                    <div className="grid grid-cols-2 gap-2 mt-[30px]">
                      {/* firstdiv */}
                      <div>
                        <img src={`http://localhost:8888/letuscook/backend/images/meals/${meal.image}`} className="w-full h-[380px] mt-[-60px] rounded-sm"/>
                      </div>

                      {/* seconddiv */}
                      <div className=' p-2 relative'>
                        <p className='absolute text-sm top-[5px] right-[10px]'>{meal.available_qty} dishes</p>
                        <h1 className='inline-block text-[44px] font-medium'>{meal.name}</h1>
                        <h2 className='text-[18px] text-gray-400'>{meal.category_name}</h2>
                        <div className="flex">
                              {Array.from({ length: 5 }, (_, i) => (
                                <FaStar
                                  key={i}
                                  className={i < avgRating ? 'text-yellow-400 size-[12px]' : 'text-gray-500 size-[12px]'}
                                />
                              ))}
                        </div>
                        <p className='text-[14px] mt-[40px]'>{meal.description}</p>
                        <p className='text-[13px] text-gray-400 italic '>{meal.cook_name}</p>
                        <div className='flex justify-between mt-[35px]'>
                          <div className='inline-block'>{meal.price} MMK</div> <div>{meal.status}</div>
                        </div>
                        {localStorage.getItem('Authrole') == 'User' && <button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          if (meal.available_qty < 1) {
                            toast.error("This item is out of stock!");
                            return;
                          }
    
                          const exists = currentBasket.find(item => item.id === meal.id);
                          if (exists) {
                            return;
                          }
    
                          setCurrentBasket(prev => [
                            ...prev, 
                            { 
                              id: meal.id, 
                              name: meal.name, 
                              count: 1, 
                              price: meal.price, 
                              image: meal.image,
                              quantity: meal.available_qty 
                            }
                          ]);
                          
                          setItemCount(count => count + 1);
                        }}
                         className='block bg-[#e59d2c] w-full text-[18px] font-medium py-[6px] rounded-sm cursor-pointer mt-[8px]'>Add to basket</button>}
                      </div>
                    </div>
                  )}


                  {/* feedback part*/}
                  <div className=' mt-[30px] pt-[40px] bg-[#16161f] container max-w-full mx-auto'>
                    <h2 className='text-4xl ml-5 font-medium tracking-wide '>Reviews</h2>
                    <small className='underline ml-5 text-gray-300'>{commentCount} reviews</small>
                    
                    <form onSubmit={(e) => handleReviewSubmit(e, meal.id)} className='w-[400px] mx-auto mt-[25px] space-y-3'>
                      <textarea type="text" className='border-b-[0.5px] border-gray-500 rounded-xs p-2 min-h-[110px] w-full block text-[14px]' placeholder='Leave your thoughts about this dish' value={comment}
                      onChange={(e) => setComment(e.target.value)}/>
                      <div className="flex justify-center space-x-1">
                        {[1, 2, 3, 4, 5].map((val) => (
                          <label key={val}>
                            <input
                              type="radio"
                              name="rating"
                              value={val}
                              className="hidden"
                              onChange={(e) => setRating(e.target.value)}
                            />
                            <span className={`text-2xl cursor-pointer ${rating >= val ? 'text-yellow-400' : 'text-gray-400'}`}>
                              ★
                            </span>
                          </label>
                        ))}
                      </div>
                      <button type="submit" className='bg-[#e59d2c] cursor-pointer rounded-[3px]  text-[18px] px-10 py-1 mt-[16px] font-medium mx-[132px]'>Submit</button>
                    </form>

                    {/* allreviews */}
                    <div>

                    <div className="mt-[50px]">
                    {/* {
                      review && review.length > 0 ? (
                        review.map((item, index) => (
                          <div key={index} className='border-b border-gray-800 w-10/11 border-opacity-25 p-4 mb-[30px] mx-auto'>
                            <div className='flex items-center space-x-3 '>
                              <img src={item.commenter_avatar } alt="" className='rounded-sm w-[50px]' />
                              <div>
                                <p>{item.commenter_name}</p>
                                {item.user_role && <i className='text-gray-300'>{item.user_role}</i>}
                                <div className="flex">
                                  {Array.from({ length: 5 }, (_, i) => (
                                    <FaStar
                                      key={i}
                                      className={i < item.rating ? 'text-yellow-400 text-[12px]' : 'text-gray-500 text-[12px]'}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className='text-sm text-white mt-[15px]'>{item.comment}</p>
                          </div>
                        ))
                      ) : (
                        <p className='text-gray-500 text-center'>No reviews available.</p>
                      )
                    } */}
                    {
  review && review.length > 0 ? (
    review.map((item, index) => (
      <div key={index} className='border-b border-gray-800 w-10/11 border-opacity-25 p-4 mb-[30px] mx-auto'>
        <div className='flex items-center space-x-3'>
          {/* Updated avatar display */}
          <img 
            src={
              item.commenter_avatar 
                ? `http://localhost:8888/letuscook/backend/images/users/${item.commenter_avatar}`
                : "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
            } 
            alt="Commenter avatar" 
            className='rounded-sm w-[50px] h-[50px] object-cover'
          />
          <div>
            <p>{item.commenter_name}</p>
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={i < item.rating ? 'text-yellow-400 text-[12px]' : 'text-gray-500 text-[12px]'}
                />
              ))}
            </div>
          </div>
        </div>
        <p className='text-sm text-white mt-[15px]'>{item.comment}</p>
      </div>
    ))
  ) : (
    <p className='text-gray-500 text-center'>No reviews available.</p>
  )
}


                    </div>
                    </div>
                  </div>

                  </div>
          </div>
      </div>
      }


{alsolikeWindow && 
<div id="default-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-10 flex flex-col justify-center items-center w-full md:inset-0 h-[calc(110%-1rem)] max-h-full bg-[rgba(0,0,0,0.5)]" onClick={()=>setAlsolikeWindow(false)}>
    <div className="relative p-4 w-full max-w-7xl max-h-full mx-auto" >

        <div className="bg-stone-100 dark:bg-[#20202a] text-white rounded-lg shadow-sm z-50 p-3 max-w-[900px] mx-auto" onClick={(e) => e.stopPropagation()} >

            <div className="flex items-center justify-between rounded-t ">
                <button type="button" className="cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={()=>setAlsolikeWindow(false)}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
<h2 className='text-center font-medium text-[32px] text-black dark:text-white'>You may also like</h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 w-[230px] md:w-[550px] lg:w-[620px] mx-auto`}>
          {randomMeals.map((meal, index) => (
            <div
              key={meal.id || index}
              className="bg-slate-100 dark:bg-[#20202a] relative rounded-2xl shadow-lg overflow-hidden p-[6px] sm:p-[8px] group max-h-[250px] md:max-h-[310px] lg:max-h-[360px] w-[245px] md:w-[240px] lg:w-[290px] cursor-pointer"
              onClick={()=>{setPopUp(true); fetchEachMeal(meal.id)}}
            >
              <div className="relative overflow-hidden rounded-md lg:rounded-2xl" >
              
              {favoriteMeals.includes(meal.id)?<FaHeart
                className='absolute z-[10] right-4 top-2 size-[25px] duration-150 mr-[-5px] cursor-pointer hover:scale-120 mb-[-5px]
                  text-red-400 hover:text-red-400'
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(meal.id);
                }}
              />:<CiHeart
                className='absolute z-[10] right-4 top-2 size-[30px] duration-150 mr-[-5px] cursor-pointer hover:scale-120 mb-[-5px]
                  text-zinc-300 hover:text-red-400'
                onClick={(e) => {
                  e.stopPropagation();
                  addFavorite(meal.id);
                }}
              />}

                <img
                  src={`http://localhost:8888/letuscook/backend/images/meals/${meal.image}` || "https://hsaba.com/wp-content/uploads/2013/07/traditionalfishnoodlesoup.jpg"}
                  alt={meal.name || "Meal"}
                  className="rounded-md lg:rounded-2xl w-full h-[110px] md:h-[140px] lg:h-[178px] object-cover group-hover:scale-105 transition duration-400 ease-in-out"
                />
              </div>
              <div className="mx-[5px] sm:mx-[20px] mt-[12px]">
                <div className="flex w-full justify-between items-end">
                  <h3 className="text-md sm:text-xl text-black  tracking-tight font-semibold">
                    {meal.name || "Tomato pasta"}
                  </h3>
                  
                </div>
                <i className="text-gray-500 text-[10px] sm:text-sm">{meal.cook_name || "MaAye"}</i>
                <div className=" flex items-center justify-between h-[10px] md:h-[30px] lg:h-[50px] ">
                  <div className="font-medium text-[#e59d2c] text-[12px] sm:text-[17px]">
                    {meal.price ? `${meal.price.toLocaleString()} MMK` : "5,000 MMK"}
                  </div>
                  <div className='flex items-center'>
                    <div className="inline-block size-[7px] rounded-[3.5px] bg-green-600 text-white "></div><span className='text-[10px] sm:text-[12px] text-black ml-1'>{meal.status}</span>
                  </div>
                </div>
                <div className='flex items-center justify-between mt-[10px]'>
                <div className='text-zinc-500 text-[12px]'>
                    {meal.available_qty} <span className='hidden lg:block'>items left</span>
                  </div>
                <button 
                    className="flex items-center border-[#b87f27] border-[1px] w-[60px] sm:w-[100px] font-medium px-5 sm:px-9 text-center py-2 cursor-pointer rounded-[5px] mr-0 sm:mr-[-5px] hover:bg-[#b87f27]  hover:border-none text-[#b87f27] hover:text-white group" 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      if (meal.available_qty < 1) {
                        toast.error("This item is out of stock!");
                        return;
                      }

                      const exists = currentBasket.find(item => item.id === meal.id);
                      if (exists) {
                        return;
                      }

                      setCurrentBasket(prev => [
                        ...prev, 
                        { 
                          id: meal.id, 
                          name: meal.name, 
                          count: 1, 
                          price: meal.price, 
                          image: meal.image,
                          quantity: meal.available_qty 
                        }
                      ]);
                      
                      setItemCount(count => count + 1);
                    }}
                  >
                    <CiShoppingCart className='text-center  inline-block text-md sm:text-2xl font-bold '/>
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
    </div>
</div>
}


{/* paymentWindow */}
{paymentWindow && 
<div id="default-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-10 flex flex-col justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[rgba(0,0,0,0.5)]" onClick={()=>setPaymentWindow(false)}>
    <div className="relative p-4 w-full max-w-7xl max-h-full mx-auto" >

        <div className="bg-stone-100 dark:bg-[#20202a] text-white rounded-lg shadow-sm z-50 p-3 max-w-[900px] mx-auto" onClick={(e) => e.stopPropagation()} >

            <div className="flex items-center justify-between rounded-t ">
                <button type="button" className="cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={()=>setPaymentWindow(false)}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>

            <div>
              <h1 className='text-3xl ml-[25px] font-medium mb-[30px] text-black dark:text-white'>Checkout</h1>
              <div className='flex justify-around max-w-[590px] mx-auto mb-4 dark:text-white text-black'>
                <button className={`cursor-pointer rounded-sm px-2 py-1 ${payment == 'KBZPay'?'border-[0.2px] bg-gradient-to-b from-white-500 from-10% via-organge-300 to-orange-400 to-95%':'hover:border-[0.2px] hover:bg-gradient-to-b from-white-500 from-10% via-organge-300 to-orange-400 to-95%'}`} onClick={()=>setPayment("KBZPay")}><img src={Kbzimage} alt="kbz" className='z-80 size-[40px] inline-block ' /> KBZPay</button>
                <button className={`cursor-pointer rounded-sm px-2 py-1 ${payment == 'WavePay'?'border-[0.2px] bg-gradient-to-b from-white-500 from-10% via-organge-300 to-orange-400 to-95%':'hover:border-[0.2px] hover:bg-gradient-to-b from-white-500 from-10% via-organge-300 to-orange-400 to-95%'}`} onClick={()=>setPayment("WavePay")}><img src={Waveimage} alt="kbz" className='z-80 size-[40px] inline-block' /> WavePay</button>
                <button className={` cursor-pointer rounded-sm px-2 py-1 ${payment == 'AYAPay'?'border-[0.2px] bg-gradient-to-b from-white-500 from-10% via-organge-300 to-orange-400 to-95%':'hover:border-[0.2px] hover:bg-gradient-to-b from-white-500 from-10% via-organge-300 to-orange-400 to-95%'}`} onClick={()=>setPayment("AYAPay")}><img src={Ayapay} alt="kbz" className='z-80 size-[40px] inline-block' /> AYAPay</button>
                <button className={` cursor-pointer rounded-sm px-2 py-1 ${payment == 'UabPay'?'border-[0.2px] bg-gradient-to-b from-white-500 from-10% via-organge-300 to-orange-400 to-95%':'hover:border-[0.2px] hover:bg-gradient-to-b from-white-500 from-10% via-organge-300 to-orange-400 to-95%'}`} onClick={()=>setPayment("UabPay")}><img src={Uab} alt="kbz" className='z-80 size-[40px] inline-block' /> UabPay</button>

                <button className={` cursor-pointer rounded-sm px-2 py-1 ${payment == 'CashOnDelivery'?'border-[0.2px] bg-gradient-to-b from-white-500 from-10% via-organge-300 to-orange-400 to-95%':'hover:border-[0.2px] hover:bg-gradient-to-b from-white-500 from-10% via-organge-300 to-orange-400 to-95%'}`} onClick={()=>setPayment("CashOnDelivery")}> Cash On Delivery</button>
              </div>

              
              <div class="max-w-2xl mx-auto">
                <div class="mb-5 grid grid-cols-2 gap-2">
                      <div>
                        <label for="large-input" class="block mb-2 text-sm font-medium text-gray-400 ">Name</label>
                        <input value={user.username} type="text" id="large-input" class="block w-full p-2 text-gray-50 border border-gray-500 rounded-xs bg-gray-600 text-base focus:ring-blue-500 focus:border-blue-500 " onChange={(e) => setUser({ ...user, username: e.target.value })}/>
                      </div>
                      <div>
                        <label for="large-input" class="block mb-2 text-sm font-medium text-gray-400 ">Address</label>
                        <input value={user.address} type="text" id="large-input" class="block w-full p-2 text-gray-50 border border-gray-500 rounded-xs bg-gray-600 text-base focus:ring-blue-500 focus:border-blue-500 " onChange={(e) => setUser({ ...user, address: e.target.value })}/>
                      </div>
                </div>
                {payment != 'CashOnDelivery' && <div class="mb-5 grid grid-cols-2 gap-2">
                      <div>
                        <label for="large-input" class="block mb-2 text-sm font-medium text-gray-400 ">Accout Name</label>
                        <input type="text" id="large-input" class="block w-full p-2 text-gray-50 border border-gray-500 rounded-xs bg-gray-600 text-base focus:ring-blue-500 focus:border-blue-500 "/>
                      </div>
                      <div>
                        <label for="large-input" class="block mb-2 text-sm font-medium text-gray-400 ">Wallet number</label>
                        <input type="text" id="large-input" class="block w-full p-2 text-gray-50 border border-gray-500 rounded-xs bg-gray-600 text-base focus:ring-blue-500 focus:border-blue-500 "/>
                      </div>
                </div>
                }

                <div class="mb-5 grid grid-cols-2 gap-2">
                      <div>
                        <label for="large-input" class="block mb-2 text-sm font-medium text-gray-400 ">Phone</label>
                        <input value={user.phone} type="text" id="large-input" class="block w-full p-2 text-gray-50 border border-gray-500 rounded-xs bg-gray-600 text-base focus:ring-blue-500 focus:border-blue-500 " onChange={(e) => setUser({ ...user, phone: e.target.value })}/>
                      </div>
                      <div>
                        <label htmlFor="" class="block mb-2 text-sm font-medium text-gray-400 ">Delivery Type</label>
                        <select
                          className='block w-full p-[9px] text-gray-200 border border-gray-500 rounded-sm bg-gray-600 text-base focus:ring-blue-500 focus:border-blue-500'
                          value={deliveryType}
                          onChange={(e) => setDeliveryType(e.target.value)}
                        >
                          <option value="">Select delivery type</option>
                          <option value="Normal Delivery">Normal delivery</option>
                          <option value="Fast Delivery">Fast delivery</option>
                        </select>
                        <p className="text-gray-500 dark:text-white mt-2">Selected: {deliveryType}</p>
                      </div>
                </div>
                <div class="mb-5"> 
                    <div>
                      <label for="large-input" class="block mb-2 text-sm font-medium text-gray-400 ">Note (Optional)</label>
                      <textarea type="text" value={note} id="large-input" class="block w-full min-h-[160px] p-2 text-gray-50 border border-gray-500 rounded-xs bg-gray-600 text-top focus:ring-blue-500 focus:border-blue-500 " onChange={(e) => setNote(e.target.value )}/>
                    </div>
                </div>  
                <p className='text-gray-500 dark:text-white'> Grand Total: {finalTotal} MMK</p>
                <button className='cursor-pointer mt-[30px] bg-[#e59d2c] text-center w-full rounded-sm text-[15px] font-semibold py-3' onClick={()=>{setPaymentWindow(false);handleBuy()}}>Pay</button>
              </div>

            </div>
            </div>
    </div>
</div>
}



    </>
  )
}

export default Meals