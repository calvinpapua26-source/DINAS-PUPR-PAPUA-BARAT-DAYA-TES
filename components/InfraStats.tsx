
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { INFRA_STATS, COLORS } from '../constants';

const InfraStats: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Capaian Infrastruktur 2024</h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              Kami berkomitmen untuk transparan dalam setiap progres pembangunan. Grafik di samping menunjukkan persentase kelayakan infrastruktur utama di seluruh wilayah Provinsi Papua Barat Daya.
            </p>
            <div className="space-y-6">
              {INFRA_STATS.map((stat, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-xl border-l-4 border-yellow-500 flex justify-between items-center shadow-sm">
                  <span className="font-bold text-gray-700">{stat.name}</span>
                  <span className="text-2xl font-black text-blue-900">{stat.value}%</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="h-[400px] bg-white p-6 rounded-2xl shadow-2xl border border-gray-100">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INFRA_STATS} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} unit="%" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {INFRA_STATS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? COLORS.primary : COLORS.accent} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfraStats;
