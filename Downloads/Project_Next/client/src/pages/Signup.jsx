import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footers from '../components/Footers';
import Carousel from '../components/Carousel';
export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        lname: '',
        email: '',
        password: '',
        cpassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    lname: formData.lname,
                    email: formData.email,
                    password: formData.password,
                    cpassword: formData.cpassword
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Đăng ký thất bại');
            }

            setSuccess(data.message || 'Đăng ký thành công! Đang chuyển hướng...');

            /*-----------------------------------------
            Resert form
     
            -------------------------------------------*/
            setFormData({
                name: '',
                lname: '',
                email: '',
                password: '',
                cpassword: ''
            });

            /*----------------------------------
            -----------------------------------*/
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <Carousel />
            <div className="max-w-4xl max-sm:max-w-lg mx-auto    mt-6">
                <div className="text-center mb-12 sm:mb-16">
                    <a href="/">

                    </a>
                    <h4 className="text-slate-600 text-base mt-6">Đăng ký tài khoản mới</h4>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-8">
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-2 block">Họ</label>
                            <input
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Nhập họ"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-2 block">Tên</label>
                            <input
                                name="lname"
                                type="text"
                                value={formData.lname}
                                onChange={handleChange}
                                className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Nhập tên"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-2 block">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Nhập email"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-2 block">Mật khẩu</label>
                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Nhập mật khẩu"
                                required
                                minLength={6}
                            />
                        </div>
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-2 block">Xác nhận mật khẩu</label>
                            <input
                                name="cpassword"
                                type="password"
                                value={formData.cpassword}
                                onChange={handleChange}
                                className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Nhập lại mật khẩu"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded text-sm">
                            {success}
                        </div>
                    )}

                    <div className="mt-12">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`mx-auto block py-3 px-6 text-sm font-medium tracking-wider rounded text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none transition-colors`}
                        >
                            {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-slate-600">
                        Đã có tài khoản?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-blue-600 hover:underline focus:outline-none"
                        >
                            Đăng nhập ngay
                        </button>
                    </p>
                </div>
            </div>

            <Footers />
        </div>
    );
}
