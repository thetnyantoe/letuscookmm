import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    password: '',
    cpassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, number, address, password, cpassword } = user;
    let newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    else if (!validateEmail(email)) newErrors.email = 'Enter a valid email.';

    if (!number.trim()) newErrors.number = 'Mobile number is required.';
    else if (number.length < 7 || number.length > 15)
      newErrors.number = 'Number should be 7 to 15 digits.';

    if (!address.trim()) newErrors.address = 'Address is required.';
    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters.';

    if (!cpassword) newErrors.cpassword = 'Confirm your password.';
    else if (password !== cpassword) newErrors.cpassword = 'Passwords do not match.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      axios.post('http://localhost:8888/letuscook/backend/dashboard/users.php',{
        ...user,
        action:'register'
      })
      // console.log('Form submitted:', user);
      toast.success("Signup successful")

      setUser({
        name: '',
        email: '',
        number: '',
        address: '',
        password: '',
        cpassword: ''
      });
    }
  };

  return (
    <>
      <div className="max-w-4xl max-sm:max-w-lg mx-auto p-6 mt-6">
        <div className="text-center mb-12 sm:mb-16">
          <h4 className="text-[#e59d2c] text-2xl mt-6">Sign up into your account</h4>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <label className="text-[#e59d2c] text-sm font-medium mb-2 block">Name</label>
              <input
                name="name"
                type="text"
                value={user.name}
                onChange={handleChange}
                className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded border border-transparent focus:border-[#e59d2c]"
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-[#e59d2c] text-sm font-medium mb-2 block">Email</label>
              <input
                name="email"
                type="text"
                value={user.email}
                onChange={handleChange}
                className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded border border-transparent focus:border-[#e59d2c]"
                placeholder="Enter email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-[#e59d2c] text-sm font-medium mb-2 block">Mobile No.</label>
              <input
                name="number"
                type="number"
                value={user.number}
                onChange={handleChange}
                className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded border border-transparent focus:border-[#e59d2c]"
                placeholder="Enter mobile number"
              />
              {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
            </div>

            <div>
              <label className="text-[#e59d2c] text-sm font-medium mb-2 block">Address</label>
              <input
                name="address"
                type="text"
                value={user.address}
                onChange={handleChange}
                className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded border border-transparent focus:border-[#e59d2c]"
                placeholder="Enter your Location"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className="text-[#e59d2c] text-sm font-medium mb-2 block">Password</label>
              <input
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded border border-transparent focus:border-[#e59d2c]"
                placeholder="Enter password"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="text-[#e59d2c] text-sm font-medium mb-2 block">Confirm Password</label>
              <input
                name="cpassword"
                type="password"
                value={user.cpassword}
                onChange={handleChange}
                className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded border border-transparent focus:border-[#e59d2c]"
                placeholder="Enter confirm password"
              />
              {errors.cpassword && <p className="text-red-500 text-xs mt-1">{errors.cpassword}</p>}
            </div>
          </div>

          <div className="mt-12">
            <button
              type="submit"
              className="mx-auto block py-3 px-6 text-sm font-medium tracking-wider rounded text-white bg-[#e59d2c] hover:bg-white hover:text-[#e59d2c] cursor-pointer focus:outline-none"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
