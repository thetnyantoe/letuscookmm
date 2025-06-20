import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Categories = () => {
  const [category, setCategory] = useState({ name: '' });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchCategories = async () => {
      
    try {
      const res = await axios.get('http://localhost:8888/letuscook/backend/dashboard/categories.php');
      const data = res.data;

      if (data && Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else {
        setCategories([]);
        console.error('Invalid categories format:', data);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.name.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8888/letuscook/backend/dashboard/categories.php', {
        action: 'create',
        name: category.name.trim()
      });

      if (res.data?.message) {
        toast.success(res.data.message)
        setCategory({ name: '' });
        
        if (Array.isArray(res.data.categories)) {
          setCategories(res.data.categories);
        }
      } else {
        setError(res.data?.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Server error: Unable to add category');
      console.error(err);
    }
  };

  const handleRemove = (categoryid) => {
    console.log('Delete called for category:', categoryid); 
  
    axios.delete('http://localhost:8888/letuscook/backend/dashboard/categories.php', {
      data: { id: categoryid }
    })
    .then(response => {
        toast.success(response.data.message)
      setCategories(prev => prev.filter(category => category.id !== categoryid));
    })
    .catch(error => {
      console.error("Delete failed:", error);
      alert("Something went wrong!");
    });
  };
  
  
  

  return (
    <div className='grid grid-cols-3'>
      <div>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto col-span-1">
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={category.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
              focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter category name"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-1">{success}</p>}
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

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-[1000px] col-span-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Category ID</th>
              <th scope="col" className="px-6 py-3">Category Name</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {cat.id}
                </th>
                <td className="px-6 py-4">{cat.category_name}</td>
                <td className="flex items-center py-4">
                    <button
                        onClick={() => handleRemove(cat.id)} 
                        className="py-2 px-3 bg-red-500 text-white hover:bg-red-600 ms-3 rounded-sm cursor-pointer"
                    >
                        Remove
                    </button>
                </td>
            </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-400">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
