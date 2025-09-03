export default function CategoryGrid() {
    const categories = [
        { name: 'Samsung Galaxy S25', price: '27.690.000₫', originalPrice: '29.990.000₫', discount: '7%', img: 'https://cdn.tgdd.vn/Products/Images/42/335925/samsung-galaxy-s25-edge-blue-thumb-600x600.jpg', specs: 'Quad HD+ (2K+)', screenSize: '6.7"', sold: '62', rating: 5 },
        { name: 'Xiaomi Redmi 13x', price: '4.290.000₫', originalPrice: '', discount: '', img: 'https://cdn.tgdd.vn/Products/Images/42/332938/xiaomi-redmi-note-14-pro-thumbnew-600x600.jpg', specs: 'Full HD+', screenSize: '6.79"', sold: '31.3k', rating: 4.9 },
        { name: 'MacBook Air 13 inch M2 16GB/256GB', price: '9.990.000₫', originalPrice: '', discount: '', img: 'https://cdn.tgdd.vn/Products/Images/44/325306/apple-macbook-air-m2-2022-xanh-den-600x600.jpg', specs: 'Full HD+', screenSize: '6.67"', sold: '97.7k', rating: 4.9 },
        { name: 'MacBook Air 13 inch M1 8GB/256GB', price: '8.990.000₫', originalPrice: '', discount: '', img: 'https://cdn.tgdd.vn/Products/Images/42/329143/iphone-16-pro-titan-trang.png', specs: 'Full HD+', screenSize: '6.77"', sold: '5k', rating: 4.9 },
        { name: 'Samsung Galaxy A56 5G 12GB/256GB', price: '3.990.000₫', originalPrice: '', discount: '', img: 'https://cdn.tgdd.vn/Products/Images/42/334930/samsung-galaxy-a36-5g-green-thumb-600x600.jpg', specs: 'HD+', screenSize: '6.72"', sold: '2k', rating: 5 },

    ];

    const tabs = [
        { name: 'Điện Thoại', active: true },
        { name: 'Apple', active: false },
        { name: 'Laptop', active: false },
        { name: 'Phụ Kiện', active: false },
        { name: 'Đồng Hồ', active: false },
        { name: 'PC, Máy In', active: false },
    ];

    return (
        <div className="w-full bg-white mt-4">
            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-bold text-black-800">Khuyến mãi Online</h2>
                </div>

                {/* Flash Sale Banner and Tabs */}
                <div className="mb-4">
                    <div className="flex items-center">
                        <div className="flex items-center gap-3 mr-8">
                            <img src="https://cdnv2.tgdd.vn/mwg-static/common/Campaign/10/0d/100d3018ffd23afe20324b164d0412cc.png" alt="" className="h-12 object-contain" />
                            <div className="bg-orange-10 text-white px-3 py-1 rounded-md font-bold">
                                <img src="https://cdnv2.tgdd.vn/mwg-static/common/Campaign/d4/17/d4177404ab82e04867a0fd79bb903450.png" alt="" className="h-12 object-contain" />
                            </div>
                        </div>

                        <div className="flex gap-x-20">
                            {tabs.map((tab, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2  text-sm font-medium ${tab.active
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Banner */}
                <div className="max-w-7xl mx-auto px-2 py-2 mb-4">
                    <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-pink-200 rounded-md p-3 flex items-center">
                        <img src="https://cdnv2.tgdd.vn/mwg-static/common/Campaign/c8/b7/c8b756baf5f990d065abf3acd1de19f6.png" alt=""
                            className="h-8 object-contain" />
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-4">
                    {categories.map((product, index) => (
                        <div key={index} className="bg-white rounded-md hover:shadow-md transition-shadow">
                            <div className="p-2 flex flex-col ">
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="w-full h-32 object-contain mb-2"
                                />

                                <h3 className="font-medium text-sm ">{product.name}</h3>
                                <div className="text-xs text-gray-600 mt-1">
                                    {product.specs} {product.screenSize}
                                </div>

                                <div className="text-red-600 font-bold mt-1">{product.price}</div>
                                {product.originalPrice && (
                                    <div className="text-gray-500 text-xs line-through">{product.originalPrice}</div>
                                )}

                                <div className="bg-white-100 text-xs p-1 rounded mt-2 w-full ">
                                    Quà {index === 0 ? '3.000.000₫' : index === 1 ? '350.000₫' : index === 2 ? '600.000₫' : index === 3 ? '360.000₫' : index === 4 ? '250.000₫' : '1.500.000₫'}
                                </div>

                                <div className="flex items-center text-xs mt-2">
                                    <span className="text-yellow-500 mr-1">★</span>
                                    <span className="mr-1">{product.rating}</span>
                                    <span className="text-gray-500">• Đã bán {product.sold}</span>
                                </div>

                            </div>

                        </div>

                    ))}
                </div>
            </div>

        </div>
    );
}






