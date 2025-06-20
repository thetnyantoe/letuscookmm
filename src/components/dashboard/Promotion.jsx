import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Promotion = () => {
    const [promotion, setPromotion] = useState({
        code: '',
        percentage: '',
        start_time: '',
        end_time: ''
      });
      const [promotions, setPromotions] = useState([]);
      const [error, setError] = useState('');
      const [success, setSuccess] = useState('');

      const fetchPromotions = async () => {
        try {
          const res = await axios.get('http://localhost:8888/letuscook/backend/dashboard/redeemcode.php');
          if (res.data && Array.isArray(res.data.promotions)) {
            setPromotions(res.data.promotions);
            console.log(res.data.promotions)
          } else {
            setPromotions([]);
            console.error('Invalid format:', res.data);
          }
        } catch (err) {
          console.error(err);
          setError('Failed to load promotions');
        }
      };
    
      useEffect(() => {
        fetchPromotions();
      }, []);


      const handleChange = (e) => {
        setPromotion({ ...promotion, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { code, percentage, start_time, end_time } = promotion;
    
        if (!code || !percentage || !start_time || !end_time) {
          setError('All fields are required');
          return;
        }
    
        try {
          const res = await axios.post('http://localhost:8888/letuscook/backend/dashboard/redeemcode.php', {
            action: 'create',
            ...promotion
          });
    
          if (res.data?.message) {
            toast.success(res.data.message);
            setPromotion({ code: '', percentage: '', start_time: '', end_time: '' });
    
            if (Array.isArray(res.data.promotions)) {
              setPromotions(res.data.promotions);
            }
          } else {
            setError(res.data?.error || 'Something went wrong');
          }
        } catch (err) {
          console.error(err);
          setError('Server error: Unable to add promotion');
        }
      };

      const handleRemove = async (id) => {
        try {
          const res = await axios.delete('http://localhost:8888/letuscook/backend/dashboard/redeemcode.php', {
            data: { id }
          });
    
          toast.success(res.data.message);
          setPromotions(prev => prev.filter(promo => promo.id !== id));
        } catch (err) {
          console.error('Delete failed:', err);
          alert('Something went wrong!');
        }
      };

  return (
    <div className='grid grid-cols-4'>
      <div>
        <form className="max-w-sm mx-auto col-span-1" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Redeem code
            </label>
            <input
              type="text"
              id="code"
                name="code"
              value={promotion.code}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
              focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter code"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Reduced Percentage
            </label>
            <input
            type="number"
            id="percentage"
            name="percentage"
              value={promotion.percentage}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
              focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Start time
            </label>
            <input
            type="datetime-local"
            id="start_time"
            name="start_time"
              value={promotion.start_time}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
              focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter promotion"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              End time
            </label>
            <input
            type="datetime-local"
            id="end_time"
            name="end_time"
              value={promotion.end_time}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
              focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter promotion"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
            focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
            text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-[1000px] ml-3 col-span-3">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Redeem Code</th>
              <th scope="col" className="px-6 py-3">Reduced percentage</th>
              <th scope="col" className="px-6 py-3">Start time</th>
              <th scope="col" className="px-6 py-3">End time</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
        
            {promotions.length > 0 ? (
              promotions.map((promo) => (
                <tr key={promo.id} className="row-style">
                  <td className="px-6 py-4">{promo.code}</td>
                  <td className="px-6 py-4">{promo.percent} %</td>
                  <td className="px-6 py-4">{promo.start_at}</td>
                  <td className="px-6 py-4">{promo.end_at}</td>
                  <td className="flex items-center py-4">
                    <button
                      onClick={() => handleRemove(promo.id)}
                      className="py-2 px-3 bg-red-500 text-white hover:bg-red-600 ms-3 rounded-sm cursor-pointer"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">No promotions found.</td>
              </tr>
            )}
            
          </tbody>
        </table>
      </div>
    </div>
  )
}
