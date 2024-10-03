import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import img1 from "../../public/slider/image1.jpg";
import img2 from "../../public/slider/image2.jpg";
import img3 from "../../public/slider/image3.jpg";

const sliderData = [
  {
    image: img1,
    author: "FastX",
    title: "HOME ESSENTIALS",
    topic: "CERAMIC ITEMS",
    description:
      "Transform your living space into a haven of comfort and style with our curated collection of home essentials. Discover a variety of high-quality products, including beautifully designed ceramic items like vases, plates, and mugs, perfect for adding a touch of elegance to any room.",
  },
  {
    image: img2,
    author: "FastX",
    title: "ELECTRONICS",
    topic: "CELLPHONES AND ACCESSORIES",
    description:
      "Stay connected and elevate your tech game with our extensive range of electronics, cellphones, and accessories. From the latest smartphones featuring cutting-edge technology to essential gadgets like tablets, smartwatches, and headphones, we offer products that combine performance with style.",
  },
  {
    image: img3,
    author: "FastX",
    title: "KITCHEN APPLIANCES",
    topic: "SMART KITCHEN",
    description:
      "Upgrade your culinary space with our premium range of kitchen appliances designed to make cooking effortless and enjoyable. Discover everything from versatile blenders and mixers to high-performance coffee makers, air fryers, and food processors that bring efficiency and style to your kitchen. ",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showText, setShowText] = useState({
    authorTitle: false,
    topic: false,
    description: false,
    buttons: false,
  });
  const [direction, setDirection] = useState(null);
  const navigate = useNavigate(); // Initialize navigate for routing

  const goToSlide = useCallback(
    (index) => {
      setDirection(index > currentSlide ? "next" : "prev");
      setCurrentSlide(index);
      setShowText({
        authorTitle: false,
        topic: false,
        description: false,
        buttons: false,
      }); // Reset text visibility
    },
    [currentSlide]
  );

  const nextSlider = useCallback(() => {
    goToSlide((currentSlide + 1) % sliderData.length);
  }, [currentSlide, goToSlide]);

  const prevSlider = useCallback(() => {
    goToSlide((currentSlide - 1 + sliderData.length) % sliderData.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const timer = setTimeout(nextSlider, 10000); // Increased to 10 seconds
    return () => clearTimeout(timer);
  }, [currentSlide, nextSlider]);

  useEffect(() => {
    // Show each text element sequentially with separate timers
    const authorTitleTimer = setTimeout(() => {
      setShowText((prev) => ({ ...prev, authorTitle: true }));
    }, 1000); // Show author and title after 1 second

    const topicTimer = setTimeout(() => {
      setShowText((prev) => ({ ...prev, topic: true }));
    }, 2000); // Show topic after 2 seconds

    const descriptionTimer = setTimeout(() => {
      setShowText((prev) => ({ ...prev, description: true }));
    }, 3000); // Show description after 3 seconds

    const buttonsTimer = setTimeout(() => {
      setShowText((prev) => ({ ...prev, buttons: true }));
    }, 4000); // Show buttons after 4 seconds

    return () => {
      clearTimeout(authorTitleTimer);
      clearTimeout(topicTimer);
      clearTimeout(descriptionTimer);
      clearTimeout(buttonsTimer);
    };
  }, [currentSlide]);

  return (
    <div className="relative h-screen overflow-hidden bg-black text-white font-sans">
      {sliderData.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
            index === currentSlide
              ? "opacity-100 z-20 scale-100"
              : "opacity-0 z-10 scale-95"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute top-1/5 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4 md:px-0">
            {/* Text container */}
            <div className="space-y-4">
              <p
                className={`font-bold tracking-widest transition-opacity duration-1000 ease-in-out ${
                  showText.authorTitle
                    ? "show-content opacity-100"
                    : "opacity-0 blur-lg"
                }`}
              >
                {slide.author}
              </p>
              <h2
                className={`text-5xl font-bold transition-opacity duration-1000 ease-in-out ${
                  showText.authorTitle
                    ? "show-content opacity-100"
                    : "opacity-0 blur-lg"
                }`}
              >
                {slide.title}
              </h2>
              <h3
                className={`text-5xl font-bold text-orange-500 transition-opacity duration-1000 ease-in-out ${
                  showText.topic
                    ? "show-content opacity-100"
                    : "opacity-0 blur-lg"
                }`}
              >
                {slide.topic}
              </h3>
              <p
                className={`max-w-2xl transition-opacity duration-1000 ease-in-out ${
                  showText.description
                    ? "show-content opacity-100"
                    : "opacity-0 blur-lg"
                }`}
              >
                {slide.description}
              </p>
              {/* SEE MORE Button */}
              <div
                className={`flex space-x-4 mt-8 transition-opacity duration-1000 ease-in-out ${
                  showText.buttons
                    ? "show-content opacity-100"
                    : "opacity-0 blur-lg"
                }`}
              >
                <button
                  className="px-6 py-2 bg-white text-black font-medium tracking-wider"
                  onClick={() => navigate("/shop")} // Navigate to shop page
                >
                  SEE MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4 z-30">
        {sliderData.map((_, index) => (
          <div
            key={index}
            className={`w-24 h-36 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
              index === currentSlide
                ? "ring-2 ring-white scale-110"
                : "scale-100 opacity-70"
            }`}
            onClick={() => goToSlide(index)}
          >
            <img
              src={sliderData[index].image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-4">
        <button
          onClick={prevSlider}
          className="w-10 h-10 rounded-full bg-white bg-opacity-25 text-white transition-colors hover:bg-white hover:text-black flex items-center justify-center"
        >
          &#8249;
        </button>
        <button
          onClick={nextSlider}
          className="w-10 h-10 rounded-full bg-white bg-opacity-25 text-white transition-colors hover:bg-white hover:text-black flex items-center justify-center"
        >
          &#8250;
        </button>
      </div>

      <div
        className="absolute top-0 left-0 h-1 bg-orange-500 transition-all duration-[10000ms] ease-linear"
        style={{ width: `${((currentSlide + 1) / sliderData.length) * 100}%` }}
      ></div>
    </div>
  );
};

export default Slider;
