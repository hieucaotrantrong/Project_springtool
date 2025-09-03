import React from 'react';

export default function MallSection() {
    const products = [
        {
            id: 1,
            name: "Samsung Galaxy Z Flip7 FE 5G 8GB/128GB",
            originalPrice: "22.990.000₫",
            salePrice: null,
            image: "https://cdn.tgdd.vn/Products/Images/42/338741/samsung-galaxy-z-flip7-fe-white-thumb-600x600.jpg",
            installment: "Nhận ưu đãi đến 6 Triệu",
            specs: ["Full HD+", "Chính 6.7\" & Phụ 3.4\"", "Hàng sắp về"],
            newLabel: "Mới",
        },
        {
            id: 2,
            name: "OPPO Reno14 5G 12GB/512GB",
            originalPrice: "16.690.000₫",
            salePrice: null,
            image: "https://cdn.tgdd.vn/Products/Images/42/339174/oppo-reno14-5g-green-thumb-600x600.jpg",
            installment: "Quà 300.000₫",
            specs: ["1.5K", "6.59\""],
            rating: 5,
            reviews: "Đã bán 2.8k",
            newLabel: "Mới",
            saleLabel: "Trả chậm 0% trả trước 0₫"
        },
        {
            id: 3,
            name: "Asus Vivobook Go 15 E1504FA R5 7520U",
            originalPrice: "14.190.000₫",
            salePrice: "12.090.000₫",
            image: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/311178/asus-vivobook-go-15-e1504fa-r5-nj776w-140225-100949-251-600x600.jpg",

            installment: "Quà 2.190.000₫",
            specs: ["RAM 16 GB", "SSD 512 GB"],
            rating: 4.9,
            reviews: "Đã bán 21k",
            saleLabel: "Trả chậm 0% trả trước 0₫"
        },
        {
            id: 4,
            name: "HP 15 fd0234TU i5 1334U (9Q969PA)",
            originalPrice: "19.390.000₫",
            salePrice: "15.490.000₫",

            image: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/323920/hp-15-fd0234tu-i5-9q969pa-170225-105831-192-600x600.jpg",
            installment: "Quà 2.190.000₫",
            specs: ["RAM 16 GB", "SSD 512 GB"],
            rating: 4.9,
            reviews: "Đã bán 9.5k",
            saleLabel: "Trả chậm 0% trả trước 0₫"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="bg-white p-4 shadow rounded-md border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-bold text-black-800">
                        <span className="text-base">Sản Phẩm Đặc Quyền</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    {/* Banner bên trái */}
                    <div className="w-1/4 pr-4">
                        <img
                            src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/e8/e1/e8e182cf81dff9d70fc9017070c848c5.png"
                            alt="Mall Banner"
                            className="w-full h-full object-cover rounded"
                        />
                    </div>

                    {/* Grid sản phẩm bên phải */}
                    <div className="w-2/3 grid grid-cols-4 gap-3">
                        {products.map((product) => (
                            <div key={product.id} className="border border-gray-200 rounded-lg p-2 hover:shadow-md transition-shadow bg-white h-full">
                                {/* Labels trên cùng */}
                                {product.newLabel && (
                                    <div className="text-xs text-red-500 mb-1">{product.newLabel}</div>
                                )}
                                {product.saleLabel && (
                                    <div className="text-xs text-gray-500 mb-1">{product.saleLabel}</div>
                                )}

                                {/* Ảnh sản phẩm */}
                                <div className="relative mb-2">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-32 object-contain"
                                    />
                                </div>

                                <h3 className="text-sm font-medium mb-1 line-clamp-2">
                                    {product.name}
                                </h3>

                                <div className="text-xs text-gray-600 mb-1">
                                    {product.specs && product.specs.map((spec, index) => (
                                        <div key={index}>{spec}</div>
                                    ))}
                                </div>

                                {/* Giá */}
                                <div className="mb-1">
                                    {product.salePrice ? (
                                        <>
                                            <div className="text-red-600 font-bold text-sm">
                                                {product.salePrice}
                                            </div>
                                            <div className="text-gray-400 line-through text-xs">
                                                {product.originalPrice}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-red-600 font-bold text-sm">
                                            {product.originalPrice}
                                        </div>
                                    )}
                                </div>

                                {/* Ưu đãi */}
                                <div className="text-xs text-orange-600 mb-1 truncate">
                                    {product.installment}
                                </div>

                                {/* Rating */}
                                {product.rating && (
                                    <div className="flex items-center text-xs">
                                        <span className="text-yellow-500">★</span>
                                        <span className="ml-1">{product.rating}</span>
                                        <span className="text-gray-500 ml-2">{product.reviews}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}