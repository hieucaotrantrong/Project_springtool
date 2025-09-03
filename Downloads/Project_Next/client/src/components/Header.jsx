import { Link, useNavigate } from 'react-router-dom';

'use client'

import { useState } from 'react'
import {
    FaUser,
    FaShoppingCart,
    FaMapMarkerAlt,
    FaSearch,
} from "react-icons/fa";

const menuItems = [
    { icon: <img src="https://cdn.tgdd.vn/content/phonne-24x24.png" className="w-5 h-5" />, label: "Điện thoại" },
    { icon: <img src="https://cdn.tgdd.vn/content/laptop-24x24.png" className="w-5 h-5" />, label: "Laptop" },
    { icon: <img src="https://cdn.tgdd.vn/content/phu-kien-24x24.png" className="w-5 h-5" />, label: "Phụ kiện" },
    { icon: <img src="https://cdn.tgdd.vn/content/smartwatch-24x24.png" className="w-5 h-5" />, label: "Smartwatch" },
    { icon: <img src="https://cdn.tgdd.vn/content/watch-24x24.png" className="w-5 h-5" />, label: "Đồng Hồ" },
    { icon: <img src="https://cdn.tgdd.vn/content/tablet-24x24.png" className="w-5 h-5" />, label: "Tablet" },
    { icon: <img src="https://cdn.tgdd.vn/content/may-cu-24x24.png" className="w-5 h-5" />, label: "Mua máy thu cũ" },
    { icon: <img src="https://cdn.tgdd.vn/content/PC-24x24.png" className="w-5 h-5" />, label: "Màn hình, Máy in" },
    { icon: <img src="https://cdn.tgdd.vn/content/sim-24x24.png" className="w-5 h-5" />, label: "Sim, Thẻ cào" },
    { icon: <img src="https://cdn.tgdd.vn/content/tien-ich-24x24.png" className="w-5 h-5" />, label: "Dịch vụ tiện ích" },
];

export default function Header() {
    const navigate = useNavigate();

    return (
        <header className="w-full bg-[#ffd400]">
            {/* Top Header */}

            <div className="w-full max-w-[1280px] mx-auto flex items-center px-4 py-2">
                {/* Logo + Search */}
                <div className="flex items-center w-[600px]">
                    <img
                        src="./assets/logo.jpg"
                        alt="Logo"
                        className="h-10 object-contain cursor-pointer"
                        onClick={() => navigate('/')}
                    />
                    <div className="relative ml-2 flex-1">
                        <div className="flex items-center bg-white rounded-full px-3 py-1">
                            <FaSearch className="text-gray-500 text-sm" />
                            <input
                                type="text"
                                placeholder="Bạn tìm gì..."
                                className="w-full px-2 py-1 text-sm outline-none bg-transparent"
                            />
                        </div>
                    </div>
                </div>
                {/* Account + Cart + Location */}
                <div className="flex items-center gap-14 ml-8">
                    <Link to="/login" className="flex items-center gap-1 text-sm font-normal hover:underline">
                        <FaUser />
                        Đăng nhập
                    </Link>
                    <Link to="/signup" className="text-sm font-normal hover:underline">
                        Đăng ký
                    </Link>
                    <div className="flex items-center gap-1 hover:underline cursor-pointer text-sm">
                        <FaShoppingCart />
                        Giỏ hàng
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-300 px-3 py-2 rounded-full cursor-pointer text-sm">
                        <FaMapMarkerAlt />
                        <span className="truncate max-w-[150px]">Thế giới di động </span>
                    </div>
                </div>
            </div>

            {/* Bottom Menu */}
            <div className="w-full max-w-[1280px] mx-auto flex flex-wrap gap-7 px-4 py-3 text-sm font-normal">
                {menuItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-1 cursor-pointer hover:underline">
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </header >
    );
}
