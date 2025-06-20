import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Mealstable = ({ setCurrentView, setEditMealId }) => {
  const [meals, setMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mealsPerPage = 10;

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8888/letuscook/backend/dashboard/meals.php');
      const data = res.data;
      if (data && Array.isArray(data.meals)) {
        setMeals(data.meals);
      } else {
        setMeals([]);
        toast.error("Invalid meals data format received");
      }
    } catch (err) {
      console.error('Error fetching meals:', err);
      setError("Failed to fetch meals. Please try again.");
      toast.error("Failed to fetch meals");
    } finally {
      setLoading(false);
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

  // Pagination logic
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);
  const totalPages = Math.ceil(meals.length / mealsPerPage);

  const nextPage = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(prev => prev - 1);
  const goToPage = (page) => setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  if (loading) return <div className="text-center py-8">Loading meals...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="min-w-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Image</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Cook</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Description</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Quantity</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentMeals.length > 0 ? (
                currentMeals.map((meal) => (
                  <tr key={meal.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4">
                      <img 
                        src={`http://localhost:8888/letuscook/backend/images/meals/${meal.image}`} 
                        className="w-16 h-16 object-cover rounded" 
                        alt={meal.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/path/to/default-image.jpg';
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{meal.name}</td>
                    <td className="px-6 py-4">{meal.cook_name}</td>
                    <td className="px-6 py-4">{meal.category_name}</td>
                    <td className="px-6 py-4 max-w-xs truncate" title={meal.description}>
                      {meal.description}
                    </td>
                    <td className="px-6 py-4">${meal.price}</td>
                    <td className="px-6 py-4">{meal.available_qty}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        meal.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {meal.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button 
                        onClick={() => handleRemove(meal.id)}
                        className="font-medium text-red-600 dark:text-red-400 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-400">
                    No meals found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enhanced Pagination */}
      {meals.length > mealsPerPage && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {indexOfFirstMeal + 1} to {Math.min(indexOfLastMeal, meals.length)} of {meals.length} meals
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 py-1 border rounded-md ${
                      currentPage === pageNum ? 'bg-blue-500 text-white border-blue-500' : ''
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <span className="px-2 py-1">...</span>
              )}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <button
                  onClick={() => goToPage(totalPages)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === totalPages ? 'bg-blue-500 text-white border-blue-500' : ''
                  }`}
                >
                  {totalPages}
                </button>
              )}
            </div>
            
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mealstable;