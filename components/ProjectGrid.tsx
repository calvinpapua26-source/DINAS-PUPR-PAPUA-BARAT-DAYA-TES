
import React from 'react';
import { MOCK_PROJECTS } from '../constants';

const ProjectGrid: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-blue-900 mb-4">Proyek Strategis Daerah</h2>
          <div className="w-24 h-1.5 bg-yellow-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Meninjau progres pembangunan infrastruktur di 5 Kabupaten dan 1 Kota di wilayah Papua Barat Daya.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_PROJECTS.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase shadow-md ${
                    project.status === 'Completed' ? 'bg-green-500 text-white' : 
                    project.status === 'In Progress' ? 'bg-blue-600 text-white' : 'bg-gray-500 text-white'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-xs text-yellow-600 font-bold mb-2 uppercase tracking-wide">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  {project.location}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 h-14 overflow-hidden">
                  {project.name}
                </h3>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Progres</span>
                    <span className="font-bold text-blue-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-900 h-2.5 rounded-full transition-all duration-1000" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-blue-900 hover:text-white transition-all">
            Lihat Semua Proyek
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
