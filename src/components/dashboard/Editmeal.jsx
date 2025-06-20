import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Editmeal = () => {
  const editmealid = localStorage.getItem('editMealId')
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [meal, setMeal] = useState({ 
    id: null,
    name: '',
    description: '',
    price: '',
    available_qty: '',
    status: '',
    category_name: '',
    image: '',
    imagePreview: null 
  });
  const [selectedFile, setSelectedFile] = useState(null); 
  const defaultImageUrl = 'https://images.ctfassets.net/kugm9fp9ib18/3aHPaEUU9HKYSVj1CTng58/d6750b97344c1dc31bdd09312d74ea5b/menu-default-image_220606_web.png';

  // This computed property will always reflect the correct image for display
  const currentImageSrc = meal.imagePreview
    ? meal.imagePreview
    : (meal.image ? `http://localhost:8888/letuscook/backend/images/meals/${meal.image}` : defaultImageUrl);

  useEffect(() => {
    // --- DEBUGGING: Check editmealid on component mount/update ---
    console.log('Editmeal component mounted/updated. editmealid:', editmealid);
    // -------------------------------------------------------------

    fetchOptions();
    fetchEditData();
  }, [editmealid]); // Add editmealid as a dependency if it can change

  const fetchOptions = async () => {
    try {
      const res = await axios.get('http://localhost:8888/letuscook/backend/dashboard/meals.php?action=option');
      if (res.data && Array.isArray(res.data.statusOptions) && Array.isArray(res.data.categoryOptions)) {
        setStatuses(res.data.statusOptions);
        setCategories(res.data.categoryOptions);
      }
    } catch (err) {
      console.error('Error fetching options:', err);
      toast.error('Failed to load options.');
    }
  };

  const fetchEditData = async () => {
    try {
      // Ensure editmealid is not null or undefined before making the request
      if (!editmealid) {
        console.warn('editmealid is missing for fetchEditData. Cannot fetch meal.');
        setMeal({
          id: null, name: '', description: '', price: '', available_qty: '', status: '', category_name: '', image: '', imagePreview: null
        });
        toast.error('Meal ID is missing. Cannot load meal data.');
        return; // Prevent making the request with a missing ID
      }

      const res = await axios.get('http://localhost:8888/letuscook/backend/dashboard/editmeal.php', {
        params: {
          editmeal_id: editmealid
        }
      });
      const data = res.data;

      if (data.status === 'success' && Array.isArray(data.meal) && data.meal.length > 0) {
        setMeal({ ...data.meal[0], imagePreview: null });
  
      } else {

        setMeal({
          id: localStorage.getItem('editMealId'), name: '', description: '',  price: '', available_qty: '', status: '', category_name: '', image: '', imagePreview: null
        });
        toast.error(data.message || 'Meal data not found.');
      }
    } catch (err) {
      console.error('Error fetching meal data:', err);
      toast.error('Failed to load meal data due to network error.');
    }
  };

  const loadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); 
      const reader = new FileReader();
      reader.onload = () => {
        setMeal(prev => ({ ...prev, imagePreview: reader.result })); 
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null); 
      setMeal(prev => ({ ...prev, imagePreview: null })); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('meal_id', meal.id);
    formData.append('name', meal.name);
    formData.append('description', meal.description);
    formData.append('price', meal.price);
    formData.append('available_qty', meal.available_qty);
    formData.append('status', meal.status);
    formData.append('category_name', meal.category_name);
    formData.append('userid', localStorage.getItem('Authid'));

    if (selectedFile) {
      formData.append('new_image', selectedFile);
      formData.append('old_image', meal.image || ''); // Send current image name if any
    } else {
      formData.append('new_image', ''); // No new file selected
      formData.append('old_image', meal.image || ''); // Keep old image name
    }

    try {
      const res = await axios.post(
        'http://localhost:8888/letuscook/backend/dashboard/editmeal.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.data.status === 'success') {
        toast.success('Meal updated successfully!');
        
        setMeal(prevMeal => ({
          ...prevMeal,
          image: res.data.newImageFileName || prevMeal.image, 
          imagePreview: null 
        }));
        setSelectedFile(null); 
      } else {
        toast.error(res.data.message || 'Update failed.');
        console.error("Backend error message:", res.data.message);
      }
    } catch (err) {
      toast.error('Something went wrong while updating the meal.');
      console.error("Axios request error:", err);
    }
  };

  return (
    <form className="max-w-md mx-auto mt-20 bg-white dark:bg-gray-800 p-8 rounded-sm shadow-lg" encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="mb-4">
        <img
          src={currentImageSrc}
          alt="Meal preview"
          className="mx-auto aspect-3/2 object-cover w-full max-h-60 rounded-md shadow"
        />
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label htmlFor="user_avatar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Upload image
        </label>
        <input
          className="block h-[30px] p-[5px] w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="user_avatar_help"
          id="user_avatar"
          accept="image/*"
          type="file"
          onChange={loadFile}
          name="imageFile"
        />
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">
          A meal picture is useful for engaging your sale.
        </div>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="name"
          id="name"
          className="peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:border-blue-600 focus:outline-none"
          placeholder=" "
          value={meal.name}
          onChange={(e) => setMeal({ ...meal, name: e.target.value })}
          required
        />
        <label
          htmlFor="name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-1.5rem] peer-focus:scale-75 peer-focus:text-blue-600"
        >
          Name
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <textarea
          name="description"
          id="description"
          className="peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:border-blue-600 focus:outline-none"
          placeholder=" "
          value={meal.description}
          onChange={(e) => setMeal({ ...meal, description: e.target.value })}
          required
        />
        <label
          htmlFor="description"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-1.5rem] peer-focus:scale-75 peer-focus:text-blue-600"
        >
          Description
        </label>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="price"
            id="price"
            className="peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:border-blue-600 focus:outline-none"
            placeholder=" "
            value={meal.price}
            onChange={(e) => setMeal({ ...meal, price: e.target.value })}
            required
          />
          <label
            htmlFor="price"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-1.5rem] peer-focus:scale-75 peer-focus:text-blue-600"
          >
            Price
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="quantity"
            id="quantity"
            className="peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:border-blue-600 focus:outline-none"
            placeholder=" "
            value={meal.available_qty}
            onChange={(e) => setMeal({ ...meal, available_qty: e.target.value })}
          />
          <label
            htmlFor="quantity"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-1.5rem] peer-focus:scale-75 peer-focus:text-blue-600"
          >
            Available Quantity
          </label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
            value={meal.category_name || ''}
            onChange={(e) => setMeal({ ...meal, category_name: e.target.value })}
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.category_name}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
            value={meal.status || ''}
            onChange={(e) => setMeal({ ...meal, status: e.target.value })}
          >
            <option value="">Select status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer"
      >
        Submit
      </button>
    </form>
  )
}

export default Editmeal;