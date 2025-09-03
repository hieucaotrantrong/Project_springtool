import React, { useState, useEffect } from 'react';

export default function PromoBanner() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const banners = [
        {
            id: 1,
            image: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/63/d9/63d9fe3bed63b3069180b3ea0a373dfb.png",
            alt: "Promo Banner 1"
        },
        {
            id: 2,
            image: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/9d/9b/9d9b6ba919e45d8e3f48700d86703135.png",
            alt: "Promo Banner 2"
        },
        {
            id: 3,
            image: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/39/98/399816da9baf6a03ab4a53baf21d0596.png",
            alt: "Promo Banner 3"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [banners.length]);

    return (
        <div className="w-full bg-white py-4">
            <div className="max-w-7xl mx-auto px-4">
                <div className="relative overflow-hidden rounded-lg">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {banners.map((banner) => (
                            <div key={banner.id} className="w-full flex-shrink-0">
                                <img
                                    src={banner.image}
                                    alt={banner.alt}
                                    className="w-full h-56 object-fill"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Dots indicator */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

