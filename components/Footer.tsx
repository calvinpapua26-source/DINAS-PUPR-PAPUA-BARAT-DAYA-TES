
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer id="kontak" className="bg-blue-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="/Logo_Papua_Barat_Daya.png"
                alt="Logo Papua Barat Daya"
                className="h-12 w-auto brightness-0 invert"
              />
              <img
                src="/PUPR.webp"
                alt="Logo PUPR"
                className="h-12 w-auto brightness-0 invert"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold leading-tight">Dinas PUPR</span>
                <span className="text-xs font-medium text-yellow-400">Papua Barat Daya</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Membangun infrastruktur yang berkelanjutan untuk kemajuan Tanah Papua dan kesejahteraan rakyat.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-yellow-400">Tautan Penting</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/info-tata-ruang" className="hover:text-white transition-colors">Info Tata Ruang</Link></li>
              <li><Link to="/akses-jalan" className="hover:text-white transition-colors">Akses Jalan</Link></li>
              <li><Link to="/data-spasial" className="hover:text-white transition-colors">Data Spasial</Link></li>
              <li><a href="https://aplikasi-sigap-dpupr-pbd.vercel.app/login" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">SIGAP Papua Barat Daya</a></li>
              <li><a href="https://stunting-poverty-insights-main.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Data Strategis</a></li>
              <li><a href="#" className="hover:text-white transition-colors">E-Procurement (LPSE)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Satu Data PUPR</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-yellow-400">Kontak Kami</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-yellow-400"></i>
                <span>Jalan Pendidikan Nomor 02, Kilometer 8, Kelurahan Klabulu, Distrik Malaimsimsa, Kota Sorong, Provinsi Papua Barat Daya</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-3 text-yellow-400"></i>
                <span>(0951) 123456</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-yellow-400"></i>
                <span>info@pupr-pbd.go.id</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-yellow-400">Media Sosial</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-400 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
            <div className="mt-8">
              <h5 className="text-xs font-bold uppercase mb-2">Langganan Newsletter</h5>
              <div className="flex">
                <input type="email" placeholder="Email Anda" className="bg-white/10 border-none rounded-l-lg px-3 py-2 text-xs focus:ring-0 w-full" />
                <button className="bg-yellow-500 text-blue-900 px-4 py-2 rounded-r-lg font-bold text-xs">Kirim</button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 text-center">
          <p className="text-gray-500 text-xs">
            &copy; 2024 Dinas PUPR Provinsi Papua Barat Daya. Seluruh Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
