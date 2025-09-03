import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBox, FaTruck, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import Home from './Home';
import Footers from './Footers';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('all'); // Thêm state cho tab

    // Tabs cho phân loại đơn hàng
    const orderTabs = [
        { key: 'all', label: 'Tất cả', count: orders.length },
        { key: 'pending', label: 'Chờ xác nhận', count: orders.filter(o => o.status === 'pending').length },
        { key: 'confirmed', label: 'Chờ lấy hàng', count: orders.filter(o => o.status === 'confirmed').length },
        { key: 'shipping', label: 'Chờ giao hàng', count: orders.filter(o => o.status === 'shipping').length },
        { key: 'completed', label: 'Đã giao', count: orders.filter(o => o.status === 'completed').length },
        { key: 'cancelled', label: 'Đã hủy', count: orders.filter(o => o.status === 'cancelled').length }
    ];

    // Filter orders theo tab
    const filteredOrders = activeTab === 'all'
        ? orders
        : orders.filter(order => order.status === activeTab);

    useEffect(() => {
        fetchUserOrders();

        // Listen for notification updates
        const handleStorageChange = (e) => {
            if (e.key === 'orderUpdate') {
                fetchUserOrders();
                localStorage.removeItem('orderUpdate');
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const fetchUserOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const userEmail = localStorage.getItem('userEmail');

            if (!token || !userEmail) {
                setError('Vui lòng đăng nhập để xem lịch sử đơn hàng');
                setLoading(false);
                return;
            }

            const response = await axios.get(`http://localhost:5000/api/orders/user/${userEmail}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Lỗi khi tải lịch sử đơn hàng:', error);
            setError('Không thể tải lịch sử đơn hàng');
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <FaClock className="text-yellow-500" />;
            case 'confirmed': return <FaBox className="text-blue-500" />;
            case 'shipping': return <FaTruck className="text-purple-500" />;
            case 'completed': return <FaCheckCircle className="text-green-500" />;
            case 'cancelled': return <FaTimesCircle className="text-red-500" />;
            default: return <FaClock className="text-gray-500" />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return 'Chờ xác nhận';
            case 'confirmed': return 'Đã xác nhận';
            case 'shipping': return 'Đang giao hàng';
            case 'completed': return 'Đã giao hàng';
            case 'cancelled': return 'Đã hủy';
            default: return 'Chờ xác nhận';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'shipping': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    if (loading) {
        return (
            <div>
                <Home />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Đang tải lịch sử đơn hàng...</p>
                    </div>
                </div>
                <Footers />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Home />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-red-600 text-lg">{error}</p>
                    </div>
                </div>
                <Footers />
            </div>
        );
    }

    return (
        <div>
            <Home />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">📦 Lịch sử đơn hàng</h1>

                    {/* Tabs phân loại đơn hàng */}
                    <div className="bg-white rounded-lg shadow-sm mb-6">
                        <div className="flex overflow-x-auto">
                            {orderTabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex-1 min-w-[120px] px-4 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key
                                        ? 'text-red-600 border-red-600 bg-red-50'
                                        : 'text-gray-600 border-transparent hover:text-gray-800 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="text-center">
                                        <div>{tab.label}</div>
                                        {tab.count > 0 && (
                                            <div className={`text-xs mt-1 ${activeTab === tab.key ? 'text-red-500' : 'text-gray-400'
                                                }`}>
                                                ({tab.count})
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Nội dung đơn hàng */}
                    {loading ? (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Đang tải lịch sử đơn hàng...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <p className="text-red-600 text-lg">{error}</p>
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaBox className="text-4xl text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                {activeTab === 'all' ? 'Chưa có đơn hàng nào' : `Không có đơn hàng ${orderTabs.find(t => t.key === activeTab)?.label.toLowerCase()}`}
                            </h3>
                            <p className="text-gray-500">
                                {activeTab === 'all' ? 'Bạn chưa đặt đơn hàng nào. Hãy mua sắm ngay!' : 'Hãy tiếp tục mua sắm để có thêm đơn hàng!'}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredOrders.map((order) => (
                                <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    Đơn hàng #{order.id}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Đặt ngày: {new Date(order.created_at).toLocaleDateString('vi-VN')}
                                                </p>
                                            </div>
                                            <div className={`flex items-center gap-2 px-3 py-2 rounded-full border ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                <span className="text-sm font-medium">{getStatusText(order.status)}</span>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-100 pt-4">
                                            <div className="flex gap-4">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-800 mb-2">{order.product_title}</h4>
                                                    <p className="text-2xl font-bold text-red-600">{order.product_price?.toLocaleString()}₫</p>
                                                    <div className="mt-3 text-sm text-gray-600">
                                                        <p><span className="font-medium">Người nhận:</span> {order.full_name}</p>
                                                        <p><span className="font-medium">Điện thoại:</span> {order.phone}</p>
                                                        <p><span className="font-medium">Địa chỉ:</span> {order.address}</p>
                                                        <p><span className="font-medium">Thanh toán:</span> {order.payment_method === 'wallet' ? 'Ví điện tử' : 'COD'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Progress bar cho trạng thái */}
                                        <div className="mt-6 pt-4 border-t border-gray-100">
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                                <span>Chờ xác nhận</span>
                                                <span>Đã xác nhận</span>
                                                <span>Đang giao</span>
                                                <span>Hoàn thành</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full transition-all duration-300 ${order.status === 'pending' ? 'bg-yellow-500 w-1/4' :
                                                        order.status === 'confirmed' ? 'bg-blue-500 w-2/4' :
                                                            order.status === 'shipping' ? 'bg-purple-500 w-3/4' :
                                                                order.status === 'completed' ? 'bg-green-500 w-full' :
                                                                    'bg-red-500 w-1/4'
                                                        }`}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footers />
        </div>
    );
};

export default OrderHistory;



