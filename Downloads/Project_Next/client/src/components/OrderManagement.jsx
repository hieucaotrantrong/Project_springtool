import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    /*----------------------------------
    -----------------------------------*/
    useEffect(() => {
        fetchOrders();
    }, []);
    /*----------------------------------
    Get all product
    -----------------------------------*/
    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/orders', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setOrders(response.data);
            setError(null);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đơn hàng:', error);
            setError('Không thể tải danh sách đơn hàng');
        }
    };
    /*----------------------------------
    Update status product
    -----------------------------------*/
    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:5000/api/orders/${orderId}`,
                { status: newStatus },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                setOrders(orders.map(order =>
                    order.id === orderId
                        ? { ...order, status: newStatus }
                        : order
                ));
            } else {
                throw new Error(response.data.error || 'Cập nhật thất bại');
            }
        } catch (error) {
            console.error('Error updating status:', error.response?.data || error);
            alert(error.response?.data?.error || 'Không thể cập nhật trạng thái đơn hàng');
        }
    };

    const statusStyle = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmed':
                return 'bg-blue-100 text-blue-800';
            case 'shipping':
                return 'bg-purple-100 text-purple-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (error) {
        return <div className="p-6 text-red-600 text-center">{error}</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">📦 Quản lý đơn hàng</h1>

            <div className="overflow-x-auto shadow rounded-lg">
                <table className="min-w-full text-sm text-gray-800 bg-white border border-gray-200">
                    <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
                        <tr>
                            <th className="px-4 py-3 text-left">ID</th>
                            <th className="px-4 py-3 text-left">Khách hàng</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Sản phẩm</th>
                            <th className="px-4 py-3 text-left">Giá</th>
                            <th className="px-4 py-3 text-left">Liên hệ</th>
                            <th className="px-4 py-3 text-left">Địa chỉ</th>
                            <th className="px-4 py-3 text-left">Ngày đặt</th>
                            <th className="px-4 py-3 text-left">Trạng thái</th>
                            <th className="px-4 py-3 text-left">Cập nhật</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-t hover:bg-gray-50 transition duration-150">
                                <td className="px-4 py-3">{order.id}</td>
                                <td className="px-4 py-3 font-medium">{order.full_name}</td>
                                <td className="px-4 py-3">{order.email}</td>
                                <td className="px-4 py-3">{order.product_title}</td>
                                <td className="px-4 py-3 text-green-600 font-semibold">{order.product_price}đ</td>
                                <td className="px-4 py-3">{order.phone}</td>
                                <td className="px-4 py-3">{order.address}</td>
                                <td className="px-4 py-3">{new Date(order.created_at).toLocaleDateString('vi-VN')}</td>
                                <td className="px-4 py-3">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(order.status)}`}>
                                        {order.status || 'pending'}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <select
                                        className="border rounded px-2 py-1 bg-white text-sm"
                                        value={order.status || 'pending'}
                                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                    >
                                        <option value="confirmed">Chờ xác nhận</option>
                                        <option value="confirmed">Đã xác nhận</option>
                                        <option value="shipping">Đang giao hàng</option>
                                        <option value="completed">Hoàn thành</option>
                                        <option value="cancelled">Đã hủy</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderManagement;
