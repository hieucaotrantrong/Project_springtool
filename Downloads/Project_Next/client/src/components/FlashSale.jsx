import React, { useRef } from 'react';
/*----------------------------------
-----------------------------------*/
export default function FlashSale() {
    const flashProducts = [
        {
            name: 'iPhone 16 Pro Max 1TB',
            specs: 'Quad HD+ (2K+)',
            price: '42.690.000₫',
            sold: 14,
            image: 'https://cdn.tgdd.vn/Products/Images/42/329151/iphone-16-pro-max-titan-trang-thumbtgdd-600x600.png',
            discount: 10,
        },
        {
            name: 'iPhone 16 Pro Max 256GB',
            specs: 'Quad HD+ (2K+)',
            price: '30.090.000₫',
            sold: 58,
            image: 'https://cdn.tgdd.vn/Products/Images/42/329149/iphone-16-pro-max-sa-mac-thumb-1-600x600.jpg',
            discount: 17,
        },
        {
            name: 'iPhone 16 Pro 256GB',
            specs: 'Quad HD+ (2K+)',
            price: '28.090.000₫',
            sold: 'ĐANG BÁN CHẠY',
            image: 'https://cdn.tgdd.vn/Products/Images/42/329144/iphone-16-pro-titan-trang.png',
            discount: 46,
        },
        {
            name: 'iPhone 16 Plus 256GB',
            specs: 'Quad HD+ (2K+)',
            price: '18.990.000₫',
            sold: 'ĐANG BÁN CHẠY',
            image: 'https://cdn.tgdd.vn/Products/Images/42/329138/iphone-16-plus-xanh-thumb-600x600.jpg',
            discount: 20,
        },
        {
            name: ' iPhone 16 Plus 128GB',
            specs: 'Quad HD+ (2K+)',
            price: '25.090.000₫',
            sold: 'ĐANG BÁN CHẠY',
            image: 'https://cdn.tgdd.vn/Products/Images/42/329135/iphone-16-black-600x600.png',
            discount: 25,
        },
        {
            name: 'iPhone 16 Pro 256GB',
            specs: 'Quad HD+ (2K+)',
            price: '33.890.000₫',
            sold: 'ĐANG BÁN CHẠY',
            image: 'https://cdn.tgdd.vn/Products/Images/42/329144/iphone-16-pro-titan-trang.png',
            discount: 30,
        },
    ];

    const flashProducts2 = [
        {
            name: 'iPhone 15 128GB',
            specs: 'Quad HD+ (2K+)',
            price: '15.390.000₫',
            sold: 125,
            image: 'https://cdn.tgdd.vn/Products/Images/42/281570/iphone-15-vang-thumb-600x600.jpg',
            discount: 15,
        },
        {
            name: 'iPhone 13 128GB',
            specs: 'Super Retina XDR 6.1',
            price: '11.690.000₫',
            sold: 'ĐANG BÁN CHẠY',
            image: 'https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-midnight-2-600x600.jpg',
            discount: 12,
        },
        {
            name: 'Samsung Galaxy S24 Ultra 5G 12GB/256GB',
            specs: 'Quad HD+ (2K+) 6.8"',
            price: '23.850.000₫',
            sold: 89,
            image: 'https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-5g-600x600.jpg',
            discount: 8,
        },
        {
            name: 'Xiaomi 14T 5G 12GB/256GB',
            specs: '1.5K 6.67"',
            price: '11.260.000₫',
            sold: 'ĐANG BÁN CHẠY',
            image: 'https://cdn.tgdd.vn/Products/Images/42/329938/xiaomi-14t-black-thumb-600x600.jpg',
            discount: 20,
        },
        {
            name: 'OPPO A3x 4GB/64GB',
            specs: 'Always-On Retina',
            price: '3.260.000₫',
            sold: 67,
            image: 'https://cdn.tgdd.vn/Products/Images/42/328449/oppo-a3x-blue-thumb-600x600.jpg',
            discount: 18,
        },
        {
            name: 'iPhone 16 256GB',
            specs: 'Super Retina XDR',
            price: '22.290.000₫',
            sold: 'ĐANG BÁN CHẠY',
            image: 'https://cdn.tgdd.vn/Products/Images/42/329136/iphone-16-pink-600x600.png',
            discount: 25,
        },
    ];

    const productRef = useRef();

    const handleScrollLeft = () => {
        productRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const handleScrollRight = () => {
        productRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <div className="bg-white mt-6 p-8 shadow rounded-md borderw-full mx-auto ml-40">
            {/* Header Flash Sale */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 ml-4">
                    <h2 className="text-lg font-bold text-black-800">Gợi ý cho bạn</h2>
                </div>
            </div>

            {/* Product Scroll List with buttons */}
            <div className="relative px-6">
                <div className="flex gap-4 overflow-x-auto" ref={productRef}>
                    {flashProducts.map((item, index) => (
                        <div
                            key={index}
                            className="w-[180px] h-auto bg-white border border-gray-200 rounded-md shadow-sm p-3 flex-shrink-0 relative flex flex-col"
                        >


                            <img src={item.image} alt={item.name} className="w-full h-32 object-contain mb-3" />

                            <h3 className="text-sm font-medium mb-2 h-10 leading-tight break-words overflow-hidden">{item.name}</h3>

                            {/* Hiển thị specs */}
                            {item.specs && (
                                <div className="text-xs text-gray-600 mb-2">{item.specs}</div>
                            )}

                            <div className="text-red-600 font-bold text-base mb-1"> {item.price}</div>

                            <div className="text-gray-400 line-through text-sm mb-2">
                                ₫ {(parseInt(item.price.replace(/\./g, '')) * (100 + item.discount) / 100).toLocaleString()}
                            </div>

                            <div className="text-orange-600 text-sm mb-2">
                                Quà {Math.floor(Math.random() * 500) + 100}.000₫
                            </div>

                            <div className="flex items-center text-sm">
                                <span className="text-yellow-500">★</span>
                                <span className="ml-1">4.{Math.floor(Math.random() * 9) + 1}</span>
                                <span className="text-gray-500 ml-2">
                                    • Đã bán {typeof item.sold === 'number' ? item.sold : Math.floor(Math.random() * 50) + 10}k
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dãy sản phẩm thứ 2 */}
            <div className="relative px-6 mt-4">
                <div className="flex gap-4 overflow-x-auto">
                    {flashProducts2.map((item, index) => (
                        <div
                            key={index}
                            className="w-[180px] h-auto bg-white border border-gray-200 rounded-md shadow-sm p-3 flex-shrink-0 relative flex flex-col"
                        >
                            <img src={item.image} alt={item.name} className="w-full h-32 object-contain mb-3" />

                            <h3 className="text-sm font-medium mb-2 h-10 leading-tight break-words overflow-hidden">{item.name}</h3>

                            {item.specs && (
                                <div className="text-xs text-gray-600 mb-2">{item.specs}</div>
                            )}

                            <div className="text-red-600 font-bold text-base mb-1"> {item.price}</div>

                            <div className="text-gray-400 line-through text-sm mb-2">
                                ₫ {(parseInt(item.price.replace(/\./g, '')) * (100 + item.discount) / 100).toLocaleString()}
                            </div>

                            <div className="text-orange-600 text-sm mb-2">
                                Quà {Math.floor(Math.random() * 500) + 100}.000₫
                            </div>

                            <div className="flex items-center text-sm">
                                <span className="text-yellow-500">★</span>
                                <span className="ml-1">4.{Math.floor(Math.random() * 9) + 1}</span>
                                <span className="text-gray-500 ml-2">
                                    • Đã bán {typeof item.sold === 'number' ? item.sold : Math.floor(Math.random() * 50) + 10}k
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}



















