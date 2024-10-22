import img1 from "../assets/images/homeSales/img1.webp";
import img2 from "../assets/images/homeSales/img2.webp";
import img3 from "../assets/images/homeSales/img3.webp";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const sliderData = [
  {
    image: img1,
    title: "ELEGANT WOMEN",
    topic: "SEASONAL MUST-HAVES",
    description:
      "Elevate your wardrobe with our chic and trendy women's collection. Discover elegant seasonal essentials, from flowy dresses to tailored blazers and cozy knitwear.",
  },
  {
    image: img2,
    title: "FASHION STARS",
    topic: "PLAYFUL & STYLISH",
    description:
      "Let your little ones shine with our playful and stylish kids' wear collection. Designed for comfort and durability, our outfits combine vibrant patterns with fun, flexible designs.",
  },
  {
    image: img3,
    title: "MODERN MEN",
    topic: "CASUAL TO CLASSIC",
    description:
      "Redefine your wardrobe with our sophisticated men's wear collection, where casual meets classic. From sharp suits to comfortable loungewear, discover versatile styles that fit every occasion.",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showText, setShowText] = useState({
    title: false,
    topic: false,
    description: false,
    button: false,
  });
  const navigate = useNavigate();

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setShowText({
      title: false,
      topic: false,
      description: false,
      button: false,
    });
  }, []);

  const nextSlider = useCallback(() => {
    goToSlide((currentSlide + 1) % sliderData.length);
  }, [currentSlide, goToSlide]);

  const prevSlider = useCallback(() => {
    goToSlide((currentSlide - 1 + sliderData.length) % sliderData.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const timer = setTimeout(nextSlider, 8000);
    return () => clearTimeout(timer);
  }, [currentSlide, nextSlider]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowText((prev) => ({ ...prev, title: true })), 300),
      setTimeout(() => setShowText((prev) => ({ ...prev, topic: true })), 600),
      setTimeout(
        () => setShowText((prev) => ({ ...prev, description: true })),
        900
      ),
      setTimeout(
        () => setShowText((prev) => ({ ...prev, button: true })),
        1200
      ),
    ];
    return () => timers.forEach(clearTimeout);
  }, [currentSlide]);

  return (
    <div className="relative h-screen overflow-hidden bg-black text-white font-sans">
      {sliderData.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
          <div className="absolute bottom-24 left-24 w-full max-w-xl">
            <div className="space-y-6">
              <h2
                className={`text-7xl font-light tracking-tight transition-all duration-700 ease-out ${
                  showText.title
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                {slide.title}
              </h2>
              <h3
                className={`text-2xl font-bold tracking-widest text-pink-600 transition-all duration-700 ease-out delay-300 ${
                  showText.topic
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                {slide.topic}
              </h3>
              <p
                className={`text-lg font-light leading-relaxed transition-all duration-700 ease-out delay-500 ${
                  showText.description
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                {slide.description}
              </p>
              <button
                className={`px-8 py-3 bg-white text-black font-semibold tracking-wide hover:bg-pink-600 hover:text-white transition-all duration-300 ease-in-out ${
                  showText.button
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                onClick={() => navigate("/shop")}
              >
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      ))}


      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4 z-30">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-pink-600 w-8"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>

      <div className="absolute top-1/2 left-8 right-8 flex justify-between items-center z-30">
        <button
          onClick={prevSlider}
          className="w-12 h-12 rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-white hover:text-black flex items-center justify-center backdrop-blur-sm"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlider}
          className="w-12 h-12 rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-white hover:text-black flex items-center justify-center backdrop-blur-sm"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full bg-pink-600 transition-all duration-[8000ms] ease-linear"
          style={{
            width: `${((currentSlide + 1) / sliderData.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default Slider;
