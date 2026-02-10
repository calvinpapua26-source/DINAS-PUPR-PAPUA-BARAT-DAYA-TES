
import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const images = [
    '/images/slide-1.jpg',
    '/images/slide-2.jpg',
    '/images/slide-3.jpg',
    '/images/slide-4.jpg',
    '/images/slide-5.jpg'
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative bg-blue-900 h-[600px] overflow-hidden">
      {/* Background Slideshow with overlay */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-40' : 'opacity-0'
              }`}
          >
            <img
              src={img}
              alt={`Papua Barat Daya Landscape ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="max-w-2xl text-white">
          <h2 className="text-yellow-400 font-bold tracking-widest uppercase mb-4 animate-bounce">
            SIGAP MEMBANGUN NEGERI
          </h2>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Membangun Infrastruktur <br />
            <span className="text-yellow-400">Papua Barat Daya</span> yang Mandiri
          </h1>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Dedikasi kami untuk menyediakan jalan, jembatan, dan perumahan rakyat yang berkualitas demi kesejahteraan seluruh masyarakat di tanah Papua Barat Daya.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
              Lihat Program Strategis
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg">
              Pengaduan Masyarakat
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <i className="fas fa-chevron-down text-2xl"></i>
      </div>
    </div>
  );
};

export default Hero;
