import React, { useState, useEffect, useRef } from "react";
import './Carousel.css';
import photo1 from '../images/img1.jpg';
import photo2 from '../images/img2.jpg';
import photo3 from '../images/img3.jpg';
import photo4 from '../images/img4.jpg';

const Carousel = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const listRef = useRef(null);
  const thumbnailRef = useRef(null);
  const [autoNextTimeout, setAutoNextTimeout] = useState(null);

  const timeRunning = 3000;
  const timeAutoNext = 7000;

  const slides = [
    {
      img: photo1,
      author: "LUNDEV",
      title: "DESIGN SLIDER",
      topic: "ANIMAL",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi...",
    },
    {
      img: photo2,
      author: "LUNDEV",
      title: "DESIGN SLIDER",
      topic: "ANIMAL",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi...",
    },
    {
      img: photo3,
      author: "LUNDEV",
      title: "DESIGN SLIDER",
      topic: "ANIMAL",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi...",
    },
    {
      img: photo4,
      author: "LUNDEV",
      title: "DESIGN SLIDER",
      topic: "ANIMAL",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi...",
    },
  ];

  const handleAutoNext = () => {
    setAutoNextTimeout(
      setTimeout(() => {
        showSlider("next");
      }, timeAutoNext)
    );
  };

  const resetAutoNext = () => {
    clearTimeout(autoNextTimeout);
    handleAutoNext();
  };

  const showSlider = (type) => {
    const totalSlides = slides.length;
    if (isAnimating) return; // Prevent multiple clicks during animation
    setIsAnimating(true);

    if (type === "next") {
      setSliderIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    } else {
      setSliderIndex(
        (prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides
      );
    }

    // Animation time
    setTimeout(() => {
      setIsAnimating(false);
    }, timeRunning);

    resetAutoNext();
  };

  useEffect(() => {
    handleAutoNext();
    return () => clearTimeout(autoNextTimeout); // Clean up timeout on unmount
  }, []);

  return (
    <div className="carousel">
      {/* List Items */}
      <div className="list" ref={listRef}>
        {slides.map((slide, index) => (
          <div
            className={`item ${index === sliderIndex ? "active" : ""}`}
            key={index}
          >
            <img src={slide.img} alt={slide.title} />
            <div className="content">
              <div className="author">{slide.author}</div>
              <div className="title">{slide.title}</div>
              <div className="topic">{slide.topic}</div>
              <div className="des">{slide.description}</div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Thumbnail */}
      <div className="thumbnail" ref={thumbnailRef}>
        {slides.map((thumbnail, index) => (
          <div
            className={`item ${index === sliderIndex ? "active" : ""}`}
            key={index}
          >
            <img src={thumbnail.img} alt={thumbnail.title} />
            <div className="content">
              <div className="title">{thumbnail.title}</div>
              <div className="description">Description</div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <div className="arrows">
        <button
          id="prev"
          onClick={() => {
            showSlider("prev");
          }}
          disabled={isAnimating}
        >
          &lt;
        </button>
        <button
          id="next"
          onClick={() => {
            showSlider("next");
          }}
          disabled={isAnimating}
        >
          &gt;
        </button>
      </div>

      {/* Time running */}
      <div className="time"></div>
    </div>
  );
};

export default Carousel;
