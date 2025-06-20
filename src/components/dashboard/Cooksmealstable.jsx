import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Cooksmealstable = ({setCurrentView,setEditMealId}) => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const res = await axios.get('http://localhost:8888/letuscook/backend/dashboard/meals.php',{
        params: {
          action: 'cooksmeals',
          userid: localStorage.getItem('Authid')
        }
      });
      const data = res.data;
      if (data && Array.isArray(data.meals)) {
        setMeals(data.meals);
        console.log(data.meals);
      } else {
        setMeals([]);
        console.error('Invalid products format:', data.meals);
      }
    } catch (err) {
      console.error('Error fetching meals:', err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete('http://localhost:8888/letuscook/backend/dashboard/meals.php', {
        data: { meal_id: id }
      });
      toast.success("Meal deleted successfully!");
      fetchMeals();
    } catch (err) {
      console.error('Error deleting meal:', err);
      toast.error("Failed to delete meal");
    }
  };

  return (
    <div className="relative shadow-md sm:rounded-lg overflow-x-auto hide-scrollbar">
      <div className='min-w-[900px]'>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-16 py-3"><span className="sr-only">Image</span></th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {meals.length > 0 ? (
              meals.map((meal) => (
                <tr key={meal.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img src={`http://localhost:8888/letuscook/backend/images/meals/${meal.image}`} className="aspect-square w-16 md:w-32 max-w-full max-h-full" alt={meal.name} />
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{meal.name}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{meal.category_name}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{meal.description}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{meal.price}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{meal.available_qty}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{meal.status}</td>
                  <td className="px-6 py-4">
                    {localStorage.getItem('Authrole') == 'Cook' && <a href="#" className="font-medium text-blue-600 dark:text-blue-400 hover:underline mr-2" onClick={() => { setCurrentView("edit"); localStorage.setItem('editMealId',meal.id) }}>Edit</a>}
                    <a onClick={() => handleRemove(meal.id)} href="#" className="font-medium text-red-600 dark:text-red-400 hover:underline">Remove</a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-400">No meals found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default Cooksmealstable;
