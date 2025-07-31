import React, { useState, useEffect } from 'react';

interface HeroSliderProps {
  images?: string[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ 
  images = [
    '/hero-1.jpg',
    '/hero-2.jpg', 
    '/hero-3.jpg',
    '/hero-4.jpg',
    '/hero-5.jpg',
    '/hero-6.jpg'
  ] 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-lg">
      {/* Slides */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Hero slide ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error(`Failed to load image ${index + 1}:`, image);
                // Fallback to a solid color if image fails to load
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.style.backgroundColor = '#1f2937';
              }}
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            
            {/* Slide content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Welcome to Abneg Portal
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl mb-6 max-w-2xl mx-auto">
                  {index === 0 && "Empowering communities through financial inclusion"}
                  {index === 1 && "Building a brighter future together"}
                  {index === 2 && "Your trusted partner in growth"}
                  {index === 3 && "Innovative solutions for modern challenges"}
                  {index === 4 && "Join our community today"}
                  {index === 5 && "Making dreams possible"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 z-10"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 z-10"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-10">
        {currentSlide + 1} / {images.length}
      </div>
    </div>
  );
};

export default HeroSlider; 