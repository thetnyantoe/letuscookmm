import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addmeal = () => {
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [img, setImg] = useState();

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const res = await axios.get('http://localhost:8888/letuscook/backend/dashboard/meals.php?action=option');
      if (res.data && Array.isArray(res.data.statusOptions) && Array.isArray(res.data.categoryOptions)) {
        setStatuses(res.data.statusOptions);
        setCategories(res.data.categoryOptions);
      }
    } catch (err) {
      console.error('Error fetching options:', err);
    }
  };

  const loadFile = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.append('image', img);
    formData.append('userid',localStorage.getItem('Authid'))

    try {
      const res = await axios.post('http://localhost:8888/letuscook/backend/dashboard/meals.php', formData);
      console.log(res.data);
      toast.success("Meal added successfully!")
      form.reset();
      setImg(null);
    } catch (err) {
      console.error('Submit error:', err);
      toast.error("Adding meal wasn't successful!")
    }
  };

  return (
    <form className="max-w-md mx-auto" encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="mb-4">
        {img && <img src={img} id="output" className="rounded-[6px] size-[200px] mx-auto" alt="Preview" />}
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
            required
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
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
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
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  );
};

export default Addmeal;
