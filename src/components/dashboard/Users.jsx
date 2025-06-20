import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from 'sweetalert';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [roleUpdates, setRoleUpdates] = useState({});
  const [filterRole, setFilterRole] = useState("All");
  const userCount = users.filter(u => u.role === "User").length;
  const cookCount = users.filter(u => u.role === "Cook").length;
  const allCount = users.length;
  useEffect(() => {
    axios.get('http://localhost:8888/letuscook/backend/dashboard/users.php')
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, []);

  const handleDelete = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this user?",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancel",
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: "Delete",
          visible: true,
          closeModal: true,
        }
      },
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        axios.delete('http://localhost:8888/letuscook/backend/dashboard/users.php', {
          data: { user_id: userId }
        })
        .then(response => {
          setUsers(prev => prev.filter(user => user.user_id !== userId));
          toast.success("Deleted successfully!")
        })
        .catch(error => {
          console.error("Delete failed:", error);
          swal("Error!", "Something went wrong!", "error");
        });
      } else {
        return;
      }
    });
  };
  

  const handleRoleChange = (userId, newRole) => {
    setRoleUpdates(prev => ({
      ...prev,
      [userId]: newRole
    }));
  };

  const updateRole = (userId) => {
    const newRole = roleUpdates[userId];
    if (!newRole) {
      toast.warning("Please select a role before submitting.");
      return;
    }

    axios.post('http://localhost:8888/letuscook/backend/dashboard/users.php', {
      action: 'change_role',
      user_id: userId,
      role: newRole
    })
      .then(res => {
        if (res.data.status === 'success') {
          toast.success("Role updated successfully!")
          setUsers(users.map(user => 
            user.user_id === userId ? { ...user, role: newRole } : user
          ));
        } else {
          toast.error(res.data.error || 'Failed to update role.')
        }
      })
      .catch(err => {
        toast.error('An error occurred while updating the role.');
      });
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-[1300px]">
      <div className="mb-4 flex gap-4">
        <button
          className={`cursor-pointer px-4 py-2 rounded ${filterRole === "All" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700"} `}
          onClick={() => setFilterRole("All")}
        >
          All ({allCount})
        </button>
        <button
          className={`cursor-pointer px-4 py-2 rounded ${filterRole === "Cook" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setFilterRole("Cook")}
        >
          Cook ({cookCount})
        </button>
        <button
          className={`cursor-pointer px-4 py-2 rounded ${filterRole === "User" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setFilterRole("User")}
        >
          Customer ({userCount})
        </button>
      </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            
              <th scope="col" className="px-2 py-3"></th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Address</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.filter(user => filterRole === "All" || user.role === filterRole).map((user) => (
              <tr key={user.user_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                
                <td className=" p-2">
                  <img src={user.avatar
                        ? `http://localhost:8888/letuscook/backend/images/users/${user.avatar}`
                        : 'http://localhost:8888/letuscook/backend/images/users/default.jpg'} className="size-[120px] w-16 md:w-32 max-w-full max-h-full rounded-xs" />
                </td>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">{user.address}</td>
                <td className="px-6 py-4">
                  <select
                    name="role"
                    value={roleUpdates[user.user_id] || user.role}
                    onChange={(e) => handleRoleChange(user.user_id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Cook">Cook</option>
                  </select>
                </td>
                <td className="flex items-center py-4 h-[140px]">
                  <button
                    type="button"
                    onClick={() => updateRole(user.user_id)}
                    className="py-2 px-3 bg-blue-500 text-white hover:bg-blue-600 rounded-sm cursor-pointer"
                  >
                    Change role
                  </button>
                  <button
                    type="button"
                    onClick={()=>handleDelete(user.user_id)}
                    className="py-2 px-3 bg-red-500 text-white hover:bg-red-600 ms-3 rounded-sm cursor-pointer"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
