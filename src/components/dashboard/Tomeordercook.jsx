import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from 'sweetalert';

const Tomeordercook = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 6;

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const customerId = localStorage.getItem('Authid');
            if (!customerId) {
                console.error('Customer ID not found');
                return;
            }

            const res = await axios.get('http://localhost:8888/letuscook/backend/dashboard/buy.php', {
                params: {
                    action: 'tomeordercook',
                    customer_id: customerId,
                }
            });

            if (res.data.status === 'success') {
                setOrders(res.data.data);
            } else {
                console.error('Error fetching orders:', res.data.message);
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChangeStatus = (itemId) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to confirm this order?",
            icon: "info",
            buttons: {
                cancel: { text: "Cancel", visible: true, closeModal: true },
                confirm: { text: "Confirm", visible: true, closeModal: true }
            },
            dangerMode: true,
        }).then(willConfirm => {
            if (willConfirm) {
                axios.post('http://localhost:8888/letuscook/backend/dashboard/buy.php', {
                    action: 'changestatus',
                    item_id: itemId
                }).then(response => {
                    if (response.data.status === 'success') {
                        toast.success("Order confirmed successfully!");
                        fetchOrders();
                    } else {
                        toast.error(response.data.message || "Failed to confirm order");
                    }
                }).catch(error => {
                    console.error("Confirmation failed:", error);
                    toast.error(error.response?.data?.message || "Something went wrong!");
                });
            }
        });
    };

    if (loading) return <div className="text-center py-8">Loading orders...</div>;

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No orders found.</div>
            ) : (
                <div className="space-y-8">
                    {currentOrders.map((orderGroup) => (
                        <div key={orderGroup.order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold">Order #{orderGroup.order.id}</h2>
                                    <p className="text-sm text-gray-500">
                                        Date: {new Date(orderGroup.order.ordered_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th className="px-4 py-3">Meal</th>
                                            <th className="px-4 py-3">Name</th>
                                            <th className="px-2 py-3">Quantity</th>
                                            <th className="px-4 py-3">Price</th>
                                            <th className="px-4 py-3">Subtotal</th>
                                            <th className='px-4 py-3'>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderGroup.items.map((item) => (
                                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-4 py-4">
                                                    <img
                                                        src={`http://localhost:8888/letuscook/backend/images/meals/${item.image}`}
                                                        alt={item.meal_name}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                </td>
                                                <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">{item.meal_name}</td>
                                                <td className="px-2 py-4">{item.quantity}</td>
                                                <td className="px-4 py-4">{item.price} MMK</td>
                                                <td className="px-4 py-4">{item.quantity * item.price} MMK</td>
                                                <td className="px-4 py-4">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                                        item.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                                        item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {item.status}
                                                    </span>
                                                    <button
                                                        className={`rounded-sm bg-blue-500 p-2 px-4 text-white font-medium text-[12px] cursor-pointer hover:bg-blue-600 ml-2 tracking-wider ${item.status === 'Confirmed' ? 'hidden' : ''}`}
                                                        onClick={() => handleChangeStatus(item.id)}
                                                    >
                                                        Confirm?
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}

                    {/* Pagination Buttons */}
                    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:opacity-50"
                            >
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, index) => {
                                const page = index + 1;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-3 py-1 rounded ${
                                            currentPage === page
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:opacity-50"
                            >
                                Next
                            </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tomeordercook;
