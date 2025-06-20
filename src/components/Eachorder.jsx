import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Eachorder = ({ currentbasketitem, removeFromBasket, updateItemCount }) => {
  

  const [count, setCount] = useState(currentbasketitem.count);

  const increment = () => {
    setCount(prev => {
      if (prev >= currentbasketitem.quantity) {toast.error("Exceeding the available quanity"); return prev}; // Don't increment beyond quantity
      const newCount = prev + 1;
      updateItemCount(currentbasketitem.id, newCount);
      return newCount;
    });
  };
  
  const decrement = () => {
    setCount(prev => {
      const newCount = prev > 1 ? prev - 1 : 1;
      updateItemCount(currentbasketitem.id, newCount);
      return newCount;
    });
  };

  return (
    <>
      <div className='relative rounded-b-sm rounded-tl-sm bg-stone-100 dark:bg-[#20202a] w-auto h-auto grid grid-cols-4 p-2 mt-[30px]'>
        <button
          className='absolute text-[10px] h-[15px] w-[50px] text-center text-white bg-red-500 top-[-15px] rounded-t-sm right-0 cursor-pointer'
          onClick={() => removeFromBasket(currentbasketitem.id)}
        >
          x
        </button>
        <div className='w-[80px] h-[60px] col-span-1'>
          <img
            className='w-[80px] h-full rounded-sm'
            src={`http://localhost:8888/letuscook/backend/images/meals/${currentbasketitem.image}` || "fallback.jpg"}
            alt={currentbasketitem.name || "Meal"}
          />
        </div>
        <div className='flex flex-col justify-evenly col-span-2 pl-[15px]'>
          <p className='font-medium text-gray-800 dark:text-white text-[16px]'>{currentbasketitem.name}</p>
          <input type="text" className='text-gray-400 text-[12px]' readOnly value={currentbasketitem.description || ""} />
        </div>
        <div>
          <form className="max-w-xs mx-auto col-span-1">
            <div className="relative flex items-center">
              <button type="button" className="shrink-0 inline-flex items-center justify-center rounded-xs size-[12px] cursor-pointer" onClick={decrement}>
                <svg className="size-2 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                </svg>
              </button>

              <input type="text" className="shrink-0 text-gray-500 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[1.5rem] text-center" value={count} readOnly />


              <button type="button" className="shrink-0 inline-flex items-center justify-center rounded-xs size-[12px] cursor-pointer" onClick={increment}>
                <svg className="size-2 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                </svg>
              </button>
            </div>
          </form>
          <p className='text-yellow-700 dark:text-[#e59d2c] text-[14px] mt-[15px]'>{currentbasketitem.price * count} Ks</p>
        </div>
      </div>
    </>
  );
};

export default Eachorder;
