import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { toast } from 'react-toastify';

const Myorders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 4;

    useEffect(() => {
        fetchOrders();
    }, []);


    const fetchOrders = async () => {
        try {
            const customerId = localStorage.getItem('Authid');
            if (!customerId) return;

            const res = await axios.get('http://localhost:8888/letuscook/backend/dashboard/buy.php', {
                params: { action: 'myorder', customer_id: customerId }
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

    if (loading) {
        return <div className="text-center py-8">Loading orders...</div>;
    }

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
                <>
                    <div className="space-y-8">
                        {currentOrders.map((orderGroup) => (
                            <div key={orderGroup.order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Date: {new Date(orderGroup.order.ordered_at).toLocaleString()}</p>
                                        <p>Note : {orderGroup.order.note}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">Payment: {orderGroup.order.payment}</p>
                                        <p className="font-medium">{orderGroup.order.address} ({orderGroup.order.delivery_type})</p>
                                        <p className="font-bold">Total: {orderGroup.order.total_price} MMK</p>
                                    </div>
                                </div>
                                <div className="overflow-x-scroll">
  <table className="min-w-[700px] w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th className="px-4 py-3 whitespace-nowrap">Meal</th>
        <th className="px-4 py-3 whitespace-nowrap">Name</th>
        <th className="px-4 py-3 whitespace-nowrap">Quantity</th>
        <th className="px-4 py-3 whitespace-nowrap">Price</th>
        <th className="px-4 py-3 whitespace-nowrap">Subtotal</th>
        <th className="px-4 py-3 whitespace-nowrap">Status</th>
      </tr>
    </thead>
    <tbody>
      {orderGroup.items.map((item) => (
        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td className="px-4 py-4">
            <img src={`http://localhost:8888/letuscook/backend/images/meals/${item.image}`} alt={item.meal_name} className="w-16 h-16 object-cover rounded" />
          </td>
          <td className="px-4 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{item.meal_name}</td>
          <td className="px-2 py-4 whitespace-nowrap">{item.quantity}</td>
          <td className="px-4 py-4 whitespace-nowrap">{item.price} MMK</td>
          <td className="px-4 py-4 whitespace-nowrap">{item.quantity * item.price} MMK</td>
          <td className="px-4 py-4 whitespace-nowrap">
            <span className={`px-2 py-1 text-xs rounded-full ${
              item.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
              item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800' 
            }`}>
              {item.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center mt-6 space-x-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Myorders;
