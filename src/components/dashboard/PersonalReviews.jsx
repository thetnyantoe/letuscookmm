import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaStar } from "react-icons/fa6";

const PersonalReviews = () => {
    const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get('http://localhost:8888/letuscook/backend/dashboard/reviews.php',{
        params: {
          action: 'personal',
          cookid: localStorage.getItem('Authid')
        }
      });
      const data = res.data;
      if (data && Array.isArray(data.reviews)) {
        setReviews(data.reviews);
        console.log(data.reviews);
      } else {
        setReviews([]);
        console.error('Invalid products format:', data.reviews);
      }
    } catch (err) {
      console.error('Error fetching meals:', err);
    }
  };


  return (
    <div className="relative overflow-x-scroll shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Reviewer</th>
            <th className="px-6 py-3">Meal</th>
            <th className="px-6 py-3">Comment</th>
            <th className="px-6 py-3 text-center">Rating</th>
          </tr>
        </thead>
        <tbody>
          
              {reviews.map((review,index)=>(
                  <tr key={review.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{review.user_name}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{review.meal_name}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{review.comment}</td>
                  <td className="text-center px-6 py-4 text-gray-900 dark:text-white">{review.rating} <FaStar className='text-yellow-500 inline-block mb-[5px]'/></td>
                </tr>)
              )}
            
        </tbody>
      </table>
    </div>
  )
}

export default PersonalReviews