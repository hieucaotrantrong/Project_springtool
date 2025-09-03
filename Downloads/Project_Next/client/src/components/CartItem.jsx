import React from "react";
import { Link, useNavigate } from "react-router-dom";

const formatPrice = (price) => {

    const numPrice = Math.floor(parseFloat(price));
    return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const CartItem = ({ id, image, title, originalPrice, price, discount }) => {
    const navigate = useNavigate();

    const handleBuyNow = () => {
        // Lấy địa chỉ từ localStorage
        const savedAddress = localStorage.getItem('userAddress') || '';

        navigate("/cartpay", {
            state: {
                id,
                image,
                title,
                originalPrice,
                price,
                discount,
                userAddress: savedAddress
            }
        });
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-3 w-full max-w-xs  ">
            <Link to={`/product/${id}`}>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-36 object-contain mb-2 cursor-pointer hover:opacity-90 transition"
                />
            </Link>

            <h2 className="text-sm font-medium mb-2 line-clamp-2">{title}</h2>
            <div className="text-xs text-gray-500 mb-2">Quad HD+ (2K+)</div>

            <div className="text-red-600 text-base font-bold mb-1">{formatPrice(price)}₫</div>
            <div className="text-gray-400 line-through text-xs mb-2">{formatPrice(originalPrice)}₫</div>
            <div className="text-orange-500 text-xs font-medium mb-2">Quà {discount}.000₫</div>

            <div className="flex items-center text-xs text-gray-600 mb-2">
                <span className="text-yellow-500">★</span>
                <span className="ml-1">4.4 • Đã bán 14k</span>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">Đang bán Chạy</span>
                <button
                    onClick={handleBuyNow}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded"
                >
                    Mua Ngay
                </button>
            </div>
        </div>
    );
};

export default CartItem;






