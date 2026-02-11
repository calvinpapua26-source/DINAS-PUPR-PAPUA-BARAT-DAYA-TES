
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface RoadReport {
    lokasi_jalan: string;
    latitude: string;
    longitude: string;
    deskripsi: string;
    image_url: string;
    jurisdiction: string;
    timestamp: string;
    source: string;
    status?: 'Baru' | 'Diproses' | 'Selesai' | 'Diteruskan';
    id?: string;
}

const AdminAntiGravity: React.FC = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState<RoadReport[]>([]);
    const [filter, setFilter] = useState<'Semua' | 'Provinsi' | 'Nasional' | 'Lainnya'>('Semua');

    useEffect(() => {
        const savedReports = localStorage.getItem('pbd_road_reports');
        if (savedReports) {
            setReports(JSON.parse(savedReports));
        }
    }, []);

    const updateReportStatus = (id: string, newStatus: RoadReport['status']) => {
        const updated = reports.map(r => r.id === id ? { ...r, status: newStatus } : r);
        setReports(updated);
        localStorage.setItem('pbd_road_reports', JSON.stringify(updated));
    };

    const filteredReports = useMemo(() => {
        return filter === 'Semua'
            ? reports
            : reports.filter(r => r.jurisdiction === filter);
    }, [reports, filter]);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-blue-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button
                        onClick={() => navigate('/')}
                        className="mb-4 text-blue-200 hover:text-white flex items-center"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Kembali ke Portal
                    </button>
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-bold">Dashboard Admin Anti-Gravity</h1>
                            <p className="text-blue-200 mt-2">Manajemen Pengaduan Kerusakan Jalan & Jembatan</p>
                        </div>
                        <div className="flex bg-blue-800 p-1 rounded-xl">
                            {(['Semua', 'Provinsi', 'Nasional', 'Lainnya'] as const).map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === f ? 'bg-yellow-500 text-blue-900 shadow-lg' : 'text-blue-200 hover:text-white'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Laporan</p>
                        <p className="text-3xl font-black text-blue-900 mt-1">{reports.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider text-red-600">Perlu Verifikasi</p>
                        <p className="text-3xl font-black text-red-600 mt-1">{reports.filter(r => r.status === 'Baru').length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider text-blue-600">Wewenang Provinsi</p>
                        <p className="text-3xl font-black text-blue-900 mt-1">{reports.filter(r => r.jurisdiction === 'Provinsi').length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider text-green-600">Selesai</p>
                        <p className="text-3xl font-black text-green-600 mt-1">{reports.filter(r => r.status === 'Selesai').length}</p>
                    </div>
                </div>

                {/* Reports Table */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 font-bold text-gray-700">Tanggal & ID</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Lokasi & Yurisdiksi</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Bukti Foto</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Status</th>
                                <th className="px-6 py-4 font-bold text-gray-700 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredReports.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center text-gray-400 font-medium">
                                        <i className="fas fa-folder-open text-4xl mb-4 block"></i>
                                        Belum ada data laporan Masuk.
                                    </td>
                                </tr>
                            ) : (
                                filteredReports.map((report) => (
                                    <tr key={report.id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-6">
                                            <div className="text-sm font-black text-blue-900">#{report.id}</div>
                                            <div className="text-xs text-gray-500 mt-1">{new Date(report.timestamp).toLocaleString('id-ID')}</div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="font-bold text-gray-800">{report.lokasi_jalan}</div>
                                            <div className="flex items-center mt-1">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${report.jurisdiction === 'Provinsi' ? 'bg-red-100 text-red-700' :
                                                        report.jurisdiction === 'Nasional' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {report.jurisdiction}
                                                </span>
                                                <span className="text-[10px] text-gray-400 ml-2 italic">{report.latitude}, {report.longitude}</span>
                                            </div>
                                            <div className="mt-2 text-xs text-gray-600 italic line-clamp-1">"{report.deskripsi}"</div>
                                        </td>
                                        <td className="px-6 py-6">
                                            {report.image_url ? (
                                                <div className="w-20 h-12 rounded-lg overflow-hidden border border-gray-200">
                                                    <img src={report.image_url} alt="Laporan" className="w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform" />
                                                </div>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">Tidak ada foto</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-6">
                                            <select
                                                value={report.status || 'Baru'}
                                                onChange={(e) => updateReportStatus(report.id!, e.target.value as any)}
                                                className={`text-xs font-bold px-3 py-1.5 rounded-full border-2 outline-none ${report.status === 'Baru' ? 'border-red-200 text-red-700 bg-red-50' :
                                                        report.status === 'Diproses' ? 'border-blue-200 text-blue-700 bg-blue-50' :
                                                            report.status === 'Selesai' ? 'border-green-200 text-green-700 bg-green-50' :
                                                                'border-gray-200 text-gray-700 bg-gray-50'
                                                    }`}
                                            >
                                                <option value="Baru">🔴 Baru</option>
                                                <option value="Diproses">🔵 Diproses</option>
                                                <option value="Diteruskan">⚪ Diteruskan</option>
                                                <option value="Selesai">🟢 Selesai</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <div className="flex justify-center space-x-2">
                                                <button className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                                <button className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all">
                                                    <i className="fas fa-map-marker-alt"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminAntiGravity;
