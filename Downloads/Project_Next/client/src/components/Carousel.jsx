import React from 'react';
import { TECarousel, TECarouselItem } from 'tw-elements-react';
import { Truck, Shirt } from 'lucide-react';

export default function Carousel() {
    return (
        <div className="w-full px-10 py-6">
            <div className="flex items-start justify-between gap-4">

                {/*----------------------------------- 
                Slider bar
                --------------------------------------*/}
                <div className="w-[85%] mx-auto">
                    <TECarousel ride="carousel" showIndicators showControls>
                        <div className="relative w-full h-64 overflow-hidden after:clear-both after:block after:content-['']">
                            <TECarouselItem itemID={1} className="relative float-left -mr-[100%] hidden w-full h-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
                                <img
                                    src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/23/05/23050828d3211ce7b91e92473a3690b3.jpg"
                                    className="w-full h-full object-cover border border-gray-300 rounded-lg"
                                    alt="Slide 1"
                                />
                                {/*
                                Hieu 
                                 */}
                            </TECarouselItem>
                            <TECarouselItem itemID={2} className="relative float-left -mr-[100%] hidden w-full h-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
                                <img
                                    src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/43/85/43854a7ba231f17252741049cc5a099a.png"
                                    className="w-full h-full object-cover border border-gray-300 rounded-lg"
                                    alt="Slide 2"
                                />
                            </TECarouselItem>
                            <TECarouselItem itemID={2} className="relative float-left -mr-[100%] hidden w-full h-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
                                <img
                                    src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/91/1b/911bdb7d43d18d76d89279f143d90f2c.png"
                                    className="w-full h-full object-cover border border-gray-300 rounded-lg"
                                    alt="Slide 2"
                                />
                            </TECarouselItem>


                        </div>
                    </TECarousel>

                </div>

            </div>
        </div>
    );
}
