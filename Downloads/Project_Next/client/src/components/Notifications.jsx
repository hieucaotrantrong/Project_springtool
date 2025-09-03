import React, { useState, useEffect } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import axios from 'axios';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [unread, setUnread] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const fetchNotifications = async () => {
        try {
            const userEmail = localStorage.getItem('userEmail');
            const response = await axios.get(`http://localhost:5000/api/notifications/${userEmail}`);

            const newNotifications = response.data;
            const oldCount = notifications.length;

            // Nếu có notification mới về đơn hàng
            if (newNotifications.length > oldCount) {
                const latestNotif = newNotifications[0];
                if (latestNotif.title.includes('Cập nhật đơn hàng')) {
                    localStorage.setItem('orderUpdate', 'true');
                }
            }

            setNotifications(newNotifications);
            setUnread(newNotifications.filter(notif => !notif.is_read).length);
        } catch (error) {
            console.error('Lỗi khi tải thông báo:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();

        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleMarkAsRead = async (notificationId) => {
        try {
            await axios.put(`http://localhost:5000/api/notifications/${notificationId}/read`);
            fetchNotifications();
        } catch (error) {
            console.error('Lỗi khi đánh dấu đã đọc:', error);
        }
    };

    return (
        <div className="relative">
            {/* Icon thông báo */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-600 hover:text-gray-800"
            >
                <IoMdNotifications className="text-2xl" />
                {unread > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {unread}
                    </span>
                )}
            </button>

            {/* Dropdown thông báo */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b">
                        <h3 className="text-lg font-semibold">Thông báo</h3>
                    </div>
                    <div className="divide-y">
                        {notifications.length === 0 ? (
                            <div className="p-4 text-gray-500 text-center">
                                Không có thông báo nào
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 hover:bg-gray-50 cursor-pointer ${!notification.is_read ? 'bg-blue-50' : ''  // Sửa read thành is_read
                                        }`}
                                    onClick={() => handleMarkAsRead(notification.id)}
                                >
                                    <div className="text-sm font-medium text-gray-900">
                                        {notification.title}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        {notification.message}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        {new Date(notification.created_at).toLocaleString('vi-VN')}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notifications;

