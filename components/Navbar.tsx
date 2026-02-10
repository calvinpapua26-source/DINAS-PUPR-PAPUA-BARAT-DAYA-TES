
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: 'Beranda', path: '/' },
    { label: 'SPM', path: '/spm' },
    { label: 'Profil', href: '#profil' },
    { label: 'Program Kerja', href: '#projects' },
    { label: 'Berita', href: '#news' },
    { label: 'Kontak', href: '#kontak' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/Logo_Papua_Barat_Daya.png"
              alt="Logo Papua Barat Daya"
              className="h-12 w-auto"
            />
            <img
              src="/PUPR.webp"
              alt="Logo PUPR"
              className="h-12 w-auto"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-blue-900 leading-tight">Dinas PUPR</span>
              <span className="text-sm font-medium text-yellow-600">Provinsi Papua Barat Daya</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              item.path ? (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`font-semibold transition-colors duration-200 ${location.pathname === item.path ? 'text-blue-900' : 'text-gray-700 hover:text-blue-900'
                    }`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-900 font-semibold transition-colors duration-200"
                >
                  {item.label}
                </a>
              )
            ))}
            <button className="bg-blue-900 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-800 transition-all shadow-md">
              E-Layanan
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-900 focus:outline-none"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-2 animate-fade-in-down">
          {menuItems.map((item) => (
            item.path ? (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block w-full text-left py-2 font-medium ${location.pathname === item.path ? 'text-blue-900' : 'text-gray-700 hover:text-blue-900'
                  }`}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="block py-2 text-gray-700 hover:text-blue-900 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            )
          ))}
          <button className="w-full bg-blue-900 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-800 transition-all shadow-md">
            E-Layanan
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
