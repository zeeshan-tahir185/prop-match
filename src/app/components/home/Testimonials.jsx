'use client';

import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const testimonialsData = [
  {
    quote: "Lorem ipsum dolor sit amet consectetur. Ex sapien vitae pellentesque sem.",
    name: "Trisha Sorensen",
    title: "Real Estate Broker"
  },
  {
    quote: "Lorem ipsum dolor sit amet consectetur. Ex sapien vitae pellentesque sem.",
    name: "Alex Brandt",
    title: "Real Estate Broker"
  },
  {
    quote: "Lorem ipsum dolor sit amet consectetur. Ex sapien vitae pellentesque sem.",
    name: "Marcus Hartman",
    title: "Real Estate Broker"
  }
];

const Testimonials = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '0',
        }
      }
    ]
  };

  return (
    <div className="max-w-[1440px] md:mx-auto mx-8 py-0 md:py-12 relative">
      <div className="relative">
        <Slider {...settings}>
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="px-2">
              <div className=" p-6 rounded-[10px] shadow-sm text-start border border-[#EDEDED] pl-[70px]">
                <p className="text-[#727176] mb-4 ">{testimonial.quote}</p>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className + " absolute right-[-40px] top-1/2 transform -translate-y-1/2"}
      style={{ ...style, display: 'block', zIndex: 10 }}
      onClick={onClick}
    >
      <BsChevronRight className="text-black text-2xl" />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className + " absolute left-[-40px] top-1/2 transform -translate-y-1/2"}
      style={{ ...style, display: 'block', zIndex: 10 }}
      onClick={onClick}
    >
      <BsChevronLeft className="text-black text-2xl" />
    </div>
  );
};

export default Testimonials;