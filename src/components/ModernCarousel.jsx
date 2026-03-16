import React, { useState, useEffect } from 'react';
import './ModernCarousel.css';

const ModernCarousel = () => {
  // Professional, high-quality images
  const slides = [
    {
      url: 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/0b6da292-e18b-5775-85a6-1da4bd5a11fb/3b43f913-334f-563f-ae27-64748183bb7a.jpg',
      title: 'Mountain Majesty',
      description: 'Explore breathtaking landscapes and natural wonders'
    },
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
      title: 'Sunset Serenity',
      description: 'Capture the perfect moments in golden hour light'
    },
    {
      url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200',
      title: 'Misty Forests',
      description: 'Discover the magic of untouched wilderness'
    },
    {
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200',
      title: 'Forest Dreams',
      description: 'Immerse yourself in nature\'s peaceful embrace'
    },
    {
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
      title: 'Coastal Views',
      description: 'Experience the power and beauty of the ocean'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  // Auto-rotation with pause on hover
  useEffect(() => {
    let intervalId;
    
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        goToNext();
      }, 5000); // 5 seconds interval
    }

    return () => clearInterval(intervalId);
  }, [currentIndex, isAutoPlaying]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Touch handlers for mobile swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <div className="carousel-wrapper">
      {/* Header Section */}
      <header className="carousel-header">
        <h1 className="header-title">
          <span className="gradient-text">Image Gallery</span>
        </h1>
        <p className="header-subtitle">Experience stunning visuals with our modern carousel</p>
      </header>

      {/* Main Carousel */}
      <div className="carousel-container">
        <div 
          className="carousel-content"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Main Image with Overlay */}
          <div className="slide-container">
            <div 
              className="slide-background"
              style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
            />
            
            <div className="slide-overlay">
              <div className="slide-content">
                <h2 className="slide-title">
                  {slides[currentIndex].title}
                </h2>
                <p className="slide-description">
                  {slides[currentIndex].description}
                </p>
                
                {/* Progress Bar */}
                <div className="progress-container">
                  <div 
                    className="progress-bar"
                    style={{ 
                      width: `${((currentIndex + 1) / slides.length) * 100}%` 
                    }}
                  />
                </div>
                
                <span className="slide-counter">
                  {currentIndex + 1} / {slides.length}
                </span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button className="nav-button prev" onClick={goToPrevious}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            
            <button className="nav-button next" onClick={goToNext}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="thumbnails-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`thumbnail ${currentIndex === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            >
              <img src={slide.url} alt={slide.title} />
              <div className="thumbnail-overlay">
                <span>{index + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Auto-play Toggle */}
        <button 
          className={`autoplay-toggle ${isAutoPlaying ? 'playing' : 'paused'}`}
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        >
          {isAutoPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
      </div>

      {/* Footer with Name and Register Number */}
      <footer className="modern-footer">
        <div className="footer-content">
          <div className="footer-info">
            <p className="student-name">Maleni M</p>
            <p className="register-number">Register Number: 212223040110</p>
          </div>
          <div className="footer-copyright">
            <p>© 2026 All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernCarousel;