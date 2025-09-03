import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Home from './Home';
import Footers from './Footers';

const CartPageView = () => {
    const navigate = useNavigate();
    const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

    // Debug: xem giá trị thực trong cartItems
    console.log('Cart items:', cartItems);
    console.log('Total price from context:', getTotalPrice());

    const formatPrice = (price) => {
        const numPrice = Math.floor(parseFloat(price));
        return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Home />

            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="mb-8">
                            <svg className="w-24 h-24 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Giỏ hàng trống</h2>
                        <p className="text-gray-500 mb-8">Không có sản phẩm nào trong giỏ hàng</p>
                        <button
                            onClick={() => navigate('/home')}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium"
                        >
                            Về trang chủ
                        </button>
                        <p className="text-sm text-gray-400 mt-4">
                            Bạn cần giúp đỡ? Gọi <span className="text-blue-500">1900 232 460</span> (08:00 - 21:30)
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Danh sách sản phẩm */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm">
                                <div className="p-6 border-b">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">Sản phẩm ({cartItems.length})</h3>
                                        <button
                                            onClick={clearCart}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Xóa tất cả
                                        </button>
                                    </div>
                                </div>

                                <div className="divide-y">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="p-6 flex gap-4">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-20 h-20 object-contain rounded border"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
                                                <p className="text-red-600 font-bold text-lg">{formatPrice(item.price)}₫</p>
                                                {item.originalPrice && (
                                                    <p className="text-gray-400 line-through text-sm">{formatPrice(item.originalPrice)}₫</p>
                                                )}
                                            </div>
                                            <div className="flex flex-col items-end gap-3">
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-400 hover:text-red-500"
                                                >
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                                    </svg>
                                                </button>
                                                <div className="flex items-center border rounded">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-12 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tóm tắt đơn hàng */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                                <h3 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h3>

                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between">
                                        <span>Tạm tính:</span>
                                        <span>{formatPrice(getTotalPrice())}₫</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Phí vận chuyển:</span>
                                        <span className="text-green-600">Miễn phí</span>
                                    </div>
                                    <hr />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Tổng cộng:</span>
                                        <span className="text-red-600">{formatPrice(getTotalPrice())}₫</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/cartpay', {
                                        state: {
                                            cartItems: cartItems,
                                            totalPrice: getTotalPrice(),
                                            isMultipleItems: true
                                        }
                                    })}
                                    className="w-full bg-[#ffd400] hover:bg-yellow-500 text-black font-medium py-3 rounded-lg mb-3"
                                >
                                    Thanh toán
                                </button>

                                <button
                                    onClick={() => navigate('/home')}
                                    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg"
                                >
                                    Tiếp tục mua sắm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footers />
        </div>
    );
};

export default CartPageView;




















