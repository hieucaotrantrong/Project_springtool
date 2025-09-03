import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaCamera, FaLock, FaArrowLeft } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        birth_date: '',
        gender: '',
        avatar: ''
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [preview, setPreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            setUser(userData);
            setFormData({
                first_name: userData.first_name || '',
                last_name: userData.last_name || '',
                email: userData.email || '',
                phone: userData.phone || '',
                address: userData.address || '',
                birth_date: userData.birth_date || '',
                gender: userData.gender || '',
                avatar: userData.avatar || ''
            });
            setPreview(userData.avatar || 'https://i.pravatar.cc/150');
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setFormData({ ...formData, avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('http://localhost:5000/api/auth/profile', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
            toast.success('Cập nhật thông tin thành công!');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Cập nhật thất bại');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('Mật khẩu mới không khớp');
            return;
        }

        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/auth/change-password', passwordData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success('Đổi mật khẩu thành công!');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            toast.error(error.response?.data?.error || 'Đổi mật khẩu thất bại');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-[#ffd400] shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/home')}
                                className="flex items-center gap-2 text-gray-800 hover:text-gray400"
                            >
                                <FaArrowLeft />
                                <span>Quay lại</span>
                            </button>
                            <h1 className="text-1xl font-bold text-gray-800">Thông tin cá nhân</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <img
                                src={preview}
                                alt="Avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className="text-sm text-gray-800">
                                {user?.first_name} {user?.last_name}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="text-center mb-6">
                                <div className="relative inline-block">
                                    <img
                                        src={preview}
                                        alt="Avatar"
                                        className="w-24 h-24 rounded-full object-cover mx-auto"
                                    />
                                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                                        <FaCamera className="w-3 h-3" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <h3 className="mt-4 font-semibold text-gray-800">
                                    {user?.first_name} {user?.last_name}
                                </h3>
                                <p className="text-sm text-gray-500">{user?.email}</p>
                            </div>

                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'profile'
                                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <FaUser />
                                    <span>Thông tin cá nhân</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('password')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'password'
                                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <FaLock />
                                    <span>Đổi mật khẩu</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            {activeTab === 'profile' && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-6">Cập nhật thông tin cá nhân</h2>
                                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Họ *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="first_name"
                                                    value={formData.first_name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Tên *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="last_name"
                                                    value={formData.last_name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Số điện thoại
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="0123456789"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Ngày sinh
                                                </label>
                                                <input
                                                    type="date"
                                                    name="birth_date"
                                                    value={formData.birth_date}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Giới tính
                                            </label>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Chọn giới tính</option>
                                                <option value="male">Nam</option>
                                                <option value="female">Nữ</option>
                                                <option value="other">Khác</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Địa chỉ
                                            </label>
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                rows={3}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Nhập địa chỉ của bạn..."
                                            />
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="px-6 py-3 bg-[#ffd400]  text-black rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                                            >
                                                {isLoading ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {activeTab === 'password' && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-6">Đổi mật khẩu</h2>
                                    <form onSubmit={handleChangePassword} className="space-y-6 max-w-md">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Mật khẩu hiện tại *
                                            </label>
                                            <input
                                                type="password"
                                                name="currentPassword"
                                                value={passwordData.currentPassword}
                                                onChange={handlePasswordChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Mật khẩu mới *
                                            </label>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={handlePasswordChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                                minLength={6}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Xác nhận mật khẩu mới *
                                            </label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={passwordData.confirmPassword}
                                                onChange={handlePasswordChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                                minLength={6}
                                            />
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 transition-colors"
                                            >
                                                {isLoading ? 'Đang đổi...' : 'Đổi mật khẩu'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Profile;












