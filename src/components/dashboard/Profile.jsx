import React, { useEffect, useState }  from 'react'
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu, X, User } from "lucide-react";
import { Navigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [changePasswordMode,setChangePasswordMode] = useState(false);
    const [img,setImg] = useState();
    useEffect(() => {
      axios.get('http://localhost:8888/letuscook/backend/dashboard/profile.php',{
          params: {
            userid: localStorage.getItem('Authid')
          }
        })
        .then((response) => {
          console.log(response.data[0])
          setUser(response.data[0]);
          
        })
        .catch((error) => {
          console.error("Failed to fetch users:", error);
        });
    }, []);

    const loadFile = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImg(file); 
    
        const reader = new FileReader();
        reader.onload = () => {
          setUser(prev => ({ ...prev, imagePreview: reader.result })); 
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
    
      formData.append('userid', localStorage.getItem('Authid'));
      formData.append('username', user.username);
      formData.append('bio', user.bio);
      formData.append('email', user.email);
      formData.append('phone', user.phone);
      formData.append('address', user.address);
    
      if (img instanceof File) {
        formData.append('profile_image', img);
        formData.append('old_image', user.avatar || '');
      }
    
      try {
        const res = await axios.post('http://localhost:8888/letuscook/backend/dashboard/profile.php', formData);
        if (res.data.status === 'success') {
          toast.success("Profile updated!");
          setEditMode(false);
        } else {
          toast.error(res.data.message || "Failed to update.");
        }
      } catch (err) {
        toast.error("Something went wrong.");
        console.error(err);
      }
    };

    const handleChangePassword = async (e) => {
      e.preventDefault();
      
      const oldPassword = document.getElementById('oldp').value;
      const newPassword = document.getElementById('newp').value;
      const confirmPassword = document.getElementById('conp').value;
    
      if (newPassword !== confirmPassword) {
        toast.error("New and Confirm password must match.");
        return;
      }
    
      try {
        const res = await fetch("http://localhost:8888/letuscook/backend/dashboard/changepassword.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: localStorage.getItem("Authid"), 
            oldPassword,
            newPassword
          })
        });
    
        const data = await res.json();
    
        if (data.status === "success") {
          toast.success("Password updated successfully!");
          setChangePasswordMode(false);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.error(err);
        toast.error("Error updating password.");
      }
    };
    
    
    

  return (
    <>
        <div className='max-w-[900px] px-4 sm:px-6 lg:px-8 mx-auto mt-[110px]'>
  <div className='relative bg-white dark:bg-zinc-800 rounded-lg shadow-sm pb-6 mx-auto'>
    <img
      src={
        user.imagePreview
          ? user.imagePreview
          : user.avatar
            ? `http://localhost:8888/letuscook/backend/images/users/${user.avatar}`
            : 'http://localhost:8888/letuscook/backend/images/users/default.jpg'
      }
      alt=""
      className='absolute top-[-70px] left-1/2 transform -translate-x-1/2 size-[120px] sm:size-[160px] rounded-full border-2 border-white dark:border-none shadow-md'
    />

    <form
      onSubmit={handleSubmit}
      className='pt-[70px] sm:pt-[120px] text-center space-y-4 mx-auto'
      encType="multipart/form-data"
    >
      {editMode && (
        <div className='space-y-1'>
          <label className='block text-gray-400 text-sm'>Insert Avatar</label>
          <input
            type="file"
            accept='image/*'
            onChange={loadFile}
            className='bg-zinc-100 p-2 rounded-md cursor-pointer text-black'
          />
        </div>
      )}

      <div>
        <input
          className={`text-center text-xl w-full max-w-xs ${editMode ? 'border-b-2 pb-1' : ''}`}
          type="text"
          value={user.username || ""}
          disabled={!editMode}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <div className='text-gray-400 mt-1'>{user.role}</div>
        <textarea
          className={`mt-4 text-[10px] sm:text-sm text-center w-full max-w-md mx-auto ${editMode ? 'border rounded p-2' : ''}`}
          rows={4}
          disabled={!editMode}
          value={user.bio || ""}
          onChange={(e) => setUser({ ...user, bio: e.target.value })}
        />
      </div>

      <div className='bg-white dark:bg-zinc-800 rounded-lg p-4 sm:p-6'>
        <h2 className='text-left text-lg sm:text-xl font-semibold mb-4'>Personal Information</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className='text-sm text-gray-600 text-left '>Email address</label>
            <input
              className={`w-full mt-1 text-[15px] sm:text-base mb-4 sm:mb-10  ${editMode ? 'border-b-2 pb-1' : ''}`}
              type="text"
              value={user.email}
              disabled={!editMode}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label className='text-sm text-gray-600 mt-4 block'>Phone</label>
            <input
              className={`w-full mt-1 text-[15px] sm:text-base ${editMode ? 'border-b-2 pb-1' : ''}`}
              type="text"
              value={user.phone}
              disabled={!editMode}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </div>
          
          <div>
            <label className='text-sm text-gray-600'>Address</label>
            <input
              className={`w-full mt-1 text-[15px] sm:text-base mb-4 sm:mb-10 ${editMode ? 'border-b-2 pb-1' : ''}`}
              type="text"
              value={user.address}
              disabled={!editMode}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />
            <label className='text-sm text-gray-600 mt-4 block'>Role</label>
            <input
              className='w-full mt-1 text-[15px] sm:text-base cursor-not-allowed'
              type="text"
              value={user.role}
              disabled
            />
          </div>
        </div>
      </div>

      {editMode && (
        <button type='submit' className='bg-black text-white py-2 px-4 rounded mt-2 hover:bg-gray-800'>
          Submit
        </button>
      )}
    </form>

    <div className='text-center mt-4 space-x-2'>
      <button
        className='bg-blue-500 hover:bg-blue-600 text-white px-10 ml-2 py-2 rounded mb-2'
        onClick={() => setEditMode(!editMode)}
      >
        {editMode ? 'Cancel editing' : 'Edit Profile'}
      </button>
      <button
        className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-2'
        onClick={() => setChangePasswordMode(true)}
      >
        Change Password
      </button>
    </div>

    {changePasswordMode && (
      <form
        onSubmit={handleChangePassword}
        className='mt-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 relative max-w-xs mx-auto'
      >
        <X className='absolute top-2 right-2 cursor-pointer' onClick={() => setChangePasswordMode(false)} />
        <div className='space-y-3'>
          <div>
            <label className='text-sm'>Old Password</label>
            <input id="oldp" type="password" className='w-full p-2 border rounded' />
          </div>
          <div>
            <label className='text-sm'>New Password</label>
            <input id="newp" type="password" className='w-full p-2 border rounded' />
          </div>
          <div>
            <label className='text-sm'>Confirm Password</label>
            <input id="conp" type="password" className='w-full p-2 border rounded' />
          </div>
        </div>
        <button
          type='submit'
          className='mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800'
        >
          Change
        </button>
      </form>
    )}


  </div>
</div>

    </>
  )
}

export default Profile