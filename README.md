# Ex05 Image Carousel
## Date:20/3/2026

## AIM
To create a Image Carousel using React 

## ALGORITHM
### STEP 1 Initial Setup:
Input: A list of images to display in the carousel.

Output: A component displaying the images with navigation controls (e.g., next/previous buttons).

### Step 2 State Management:
Use a state variable (currentIndex) to track the index of the current image displayed.

The carousel starts with the first image, so initialize currentIndex to 0.

### Step 3 Navigation Controls:
Next Image: When the "Next" button is clicked, increment currentIndex.

If currentIndex is at the end of the image list (last image), loop back to the first image using modulo:
currentIndex = (currentIndex + 1) % images.length;

Previous Image: When the "Previous" button is clicked, decrement currentIndex.

If currentIndex is at the beginning (first image), loop back to the last image:
currentIndex = (currentIndex - 1 + images.length) % images.length;

### Step 4 Displaying the Image:
The currentIndex determines which image is displayed.

Using the currentIndex, display the corresponding image from the images list.

### Step 5 Auto-Rotation:
Set an interval to automatically change the image after a set amount of time (e.g., 3 seconds).

Use setInterval to call the nextImage() function at regular intervals.

Clean up the interval when the component unmounts using clearInterval to prevent memory leaks.

## PROGRAM
ModernCarousel.css
```
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.carousel-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 20px;
}

/* Header Styles */
.carousel-header {
  text-align: center;
  margin-bottom: 50px;
}

.header-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 15px;
  letter-spacing: -2px;
}

.gradient-text {
  background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.header-subtitle {
  color: rgba(255,255,255,0.9);
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 1px;
}

/* Carousel Container */
.carousel-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 30px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 30px;
}

.carousel-content {
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 25px;
  position: relative;
}

.slide-container {
  position: relative;
  height: 600px;
  overflow: hidden;
}

.slide-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.slide-container:hover .slide-background {
  transform: scale(1.05);
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.8)
  );
  display: flex;
  align-items: flex-end;
  padding: 50px;
}

.slide-content {
  color: white;
  max-width: 600px;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.slide-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 15px;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.slide-description {
  font-size: 1.2rem;
  margin-bottom: 25px;
  opacity: 0.9;
  line-height: 1.6;
}

/* Progress Bar */
.progress-container {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  margin-bottom: 15px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.slide-counter {
  font-size: 0.9rem;
  opacity: 0.8;
  letter-spacing: 1px;
}

/* Navigation Buttons */
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-50%) scale(1.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.nav-button.prev {
  left: 25px;
}

.nav-button.next {
  right: 25px;
}

.nav-button svg {
  fill: white;
  width: 30px;
  height: 30px;
}

/* Thumbnail Navigation */
.thumbnails-container {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0;
}

.thumbnail {
  position: relative;
  width: 120px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 3px solid transparent;
}

.thumbnail.active {
  border-color: #fff;
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255,255,255,0.3);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.thumbnail:hover .thumbnail-overlay {
  opacity: 1;
}

.thumbnail-overlay span {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
}

/* Auto-play Toggle */
.autoplay-toggle {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 30px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 20px auto 0;
  display: block;
}

.autoplay-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.autoplay-toggle.playing {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-color: transparent;
}

/* Modern Footer */
.modern-footer {
  margin-top: 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.student-name {
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.register-number {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
}

.footer-copyright p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .header-title {
    font-size: 3rem;
  }
  
  .slide-container {
    height: 500px;
  }
  
  .slide-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .carousel-container {
    padding: 20px;
  }
  
  .slide-container {
    height: 400px;
  }
  
  .slide-overlay {
    padding: 30px;
  }
  
  .slide-title {
    font-size: 2rem;
  }
  
  .slide-description {
    font-size: 1rem;
  }
  
  .nav-button {
    width: 40px;
    height: 40px;
  }
  
  .thumbnail {
    width: 80px;
    height: 60px;
  }
  
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .header-title {
    font-size: 2rem;
  }
  
  .slide-container {
    height: 300px;
  }
  
  .slide-title {
    font-size: 1.5rem;
  }
  
  .nav-button {
    width: 35px;
    height: 35px;
  }
  
  .nav-button svg {
    width: 20px;
    height: 20px;
  }
}
```
ModernCarousel.jsx
```
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
```
## OUTPUT
![alt text](<Screenshot 2026-03-16 201300.png>)
![alt text](<Screenshot 2026-03-16 201319.png>)
## RESULT
The program for creating Image Carousel using React is executed successfully.
