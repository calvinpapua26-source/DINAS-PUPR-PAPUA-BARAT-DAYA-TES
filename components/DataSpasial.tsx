import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';

const DataSpasial: React.FC = () => {
    const navigate = useNavigate();
    // 1. Array Data stabil dengan useMemo
    const gisLayers = useMemo(() => [
        { id: 'btskab_2', name: 'Batas Kabupaten', url: '/data/btskab_2.json', color: '#dc2626', icon: 'fa-map-marked' },
        { id: 'desapbd2', name: 'Batas Desa', url: '/data/desapbd2.json', color: '#94a3b8', icon: 'fa-map' },
        { id: 'jalan_nasional', name: 'Jalan Nasional', url: '/data/jalan nasional.json', color: '#2563eb', icon: 'fa-road' },
        { id: 'jlnprov', name: 'Jalan Provinsi', url: '/data/jlnprov.json', color: '#ea580c', icon: 'fa-road' },
        { id: 'irigasi', name: 'Jaringan Irigasi', url: '/data/jaringan irigasi pbd.json', color: '#06b6d4', icon: 'fa-tint' },
        { id: 'resiko_banjir', name: 'Resiko Banjir', url: '/data/INDEKS RESIKO BANJIR.json', color: '#3b82f6', icon: 'fa-house-flood-water' },
        { id: 'resiko_longsor', name: 'Resiko Longsor', url: '/data/INDEKS RESIKO LONGSOR.json', color: '#b91c1c', icon: 'fa-hill-rockslide' },
        { id: 'hutan', name: 'Kawasan Hutan', url: '/data/kwsnhtn 1.json', color: '#15803d', icon: 'fa-tree' },
        { id: 'bendungan', name: 'Bendungan', url: '/data/bendungan pbd.json', color: '#1d4ed8', icon: 'fa-water-reduc' },
        { id: 'jembatan', name: 'Jembatan Nasional', url: '/data/jembatan nasional.json', color: '#854d0e', icon: 'fa-bridge' },
        { id: 'ipal', name: 'Lokasi IPAL', url: '/data/lokasi IPAL.json', color: '#7c3aed', icon: 'fa-recycle' },
        { id: 'iplt', name: 'Lokasi IPLT', url: '/data/LOKASI IPLT.json', color: '#6d28d9', icon: 'fa-biohazard' },
        { id: 'tpa', name: 'Lokasi TPA', url: '/data/LOKASI TPA.json', color: '#4b5563', icon: 'fa-trash' },
        { id: 'banjir_bandang', name: 'Banjir Bandang', url: '/data/INDEKS RESIKO BANJIR BANDANG.json', color: '#1e3a8a', icon: 'fa-water' },
        { id: 'kemampuan_lahan', name: 'Kemampuan Lahan', url: '/data/kemampuan lahan B.json', color: '#713f12', icon: 'fa-mountain' },
        { id: 'pengendali_banjir', name: 'Pengendali Banjir', url: '/data/pengendali banjir pbd.json', color: '#0369a1', icon: 'fa-shield-halved' },
    ], []);

    const shapefiles = useMemo(() => [
        { name: 'Batas Administrasi Papua Barat Daya', size: '2.4 MB', format: 'SHP', access: 'Publik', year: '2024' },
        { name: 'Jaringan Jalan Provinsi', size: '5.1 MB', format: 'SHP', access: 'Publik', year: '2024' },
        { name: 'Jaringan Irigasi', size: '3.8 MB', format: 'SHP', access: 'Terbatas', year: '2023' },
        { name: 'Tata Guna Lahan', size: '8.2 MB', format: 'SHP', access: 'Publik', year: '2024' },
        { name: 'Topografi & Kontur', size: '12.5 MB', format: 'SHP', access: 'Terbatas', year: '2023' },
        { name: 'Daerah Aliran Sungai (DAS)', size: '4.6 MB', format: 'SHP', access: 'Publik', year: '2024' },
    ], []);

    const statistics = useMemo(() => [
        { label: 'Total Panjang Jalan Mantap', value: '1,911 km', icon: 'fa-road', color: 'bg-blue-600', percentage: 78 },
        { label: 'Cakupan Irigasi', value: '12,450 ha', icon: 'fa-water', color: 'bg-green-600', percentage: 65 },
        { label: 'Jembatan Aktif', value: '142 unit', icon: 'fa-bridge', color: 'bg-yellow-600', percentage: 92 },
        { label: 'Gedung Pemerintah', value: '89 unit', icon: 'fa-building', color: 'bg-purple-600', percentage: 100 },
    ], []);

    const mapMarkers = useMemo((): Array<{ position: [number, number]; title: string; description?: string }> => [
        { position: [-0.8813, 131.2944], title: "Pusat Pengolahan Data", description: "Storage server WebGIS Papua Barat Daya" },
        { position: [-1.3361, 132.2375], title: "Infrastruktur Terintegrasi", description: "Layer Irigasi & Jalan Nasional" }
    ], []);

    // 2. State Management
    const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
        'Batas Kabupaten': true,
        'Jalan Nasional': true,
    });
    const [layerOpacities, setLayerOpacities] = useState<Record<string, number>>({});

    const toggleLayer = (name: string) => {
        setActiveLayers(prev => {
            const newState = { ...prev, [name]: !prev[name] };
            console.log(`Toggling layer: ${name}, New Status: ${newState[name]}`);
            return newState;
        });
    };

    const handleOpacityChange = (name: string, value: number) => {
        setLayerOpacities(prev => ({ ...prev, [name]: value }));
    };

    // Prepare layers for MapComponent
    const geoJsonLayers = useMemo(() =>
        gisLayers.map(layer => ({
            url: layer.url,
            name: layer.name,
            visible: !!activeLayers[layer.name],
            style: { color: layer.color, weight: 2 },
            opacity: layerOpacities[layer.name] !== undefined ? layerOpacities[layer.name] : 0.3
        })), [gisLayers, activeLayers, layerOpacities]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-pupr text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {true && (
                        <button
                            onClick={() => navigate('/')}
                            className="mb-6 flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors group"
                        >
                            <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                            <span className="font-semibold">Kembali ke Beranda</span>
                        </button>
                    )}
                    <h1 className="text-4xl font-extrabold mb-4">Data Spasial</h1>
                    <p className="text-xl text-blue-100 max-w-3xl">
                        Akses Data Geospasial untuk Kebutuhan Teknis, Akademisi, dan Investor
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

                {/* Introduction */}
                <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                    <div className="flex items-start space-x-4 mb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-database text-2xl text-blue-900"></i>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-blue-900 mb-4">Tentang Data Spasial</h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                Portal Data Spasial ini menyediakan akses ke data geospasial akurat untuk mendukung perencanaan pembangunan,
                                penelitian akademis, dan analisis investasi di Papua Barat Daya. Semua data telah diverifikasi dan diperbarui secara berkala.
                            </p>
                        </div>
                    </div>
                </section>

                {/* WebGIS Section */}
                <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-blue-900">
                                <i className="fas fa-globe mr-3 text-yellow-500"></i>
                                WebGIS Interaktif Papua Barat Daya
                            </h2>
                            <p className="text-gray-600 mt-2">Gunakan panel di kiri untuk mengontrol visibilitas layer data spasial.</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-bold flex items-center">
                                <i className="fas fa-database mr-2"></i>
                                {gisLayers.length} Layers Terintegrasi
                            </span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Control Panel */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                    <i className="fas fa-layer-group mr-2 text-blue-600"></i>
                                    Kontrol Layer
                                </h3>
                                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                    {gisLayers.map(layer => (
                                        <div key={layer.id} className="space-y-2">
                                            <label
                                                className={`flex items-center p-3 rounded-xl border transition-all cursor-pointer ${activeLayers[layer.name]
                                                    ? 'bg-blue-50 border-blue-200 text-blue-900 shadow-sm'
                                                    : 'bg-white border-transparent text-gray-600 hover:border-gray-200'
                                                    }`}
                                            >
                                                <div className="relative flex items-center justify-center w-6 h-6 mr-3">
                                                    <input
                                                        type="checkbox"
                                                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                        checked={!!activeLayers[layer.name]}
                                                        onChange={() => toggleLayer(layer.name)}
                                                    />
                                                </div>
                                                <span className="flex-1 text-xs font-semibold truncate leading-tight">
                                                    {layer.name}
                                                </span>
                                                <div className="w-3 h-3 rounded-full ml-2 shadow-sm" style={{ backgroundColor: layer.color }}></div>
                                            </label>

                                            {activeLayers[layer.name] && (
                                                <div className="px-3 pb-2 animate-in fade-in slide-in-from-top-1 duration-200">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Transparansi</span>
                                                        <span className="text-[10px] font-black text-blue-600">{Math.round((layerOpacities[layer.name] ?? 0.3) * 100)}%</span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="1"
                                                        step="0.1"
                                                        value={layerOpacities[layer.name] ?? 0.3}
                                                        onChange={(e) => handleOpacityChange(layer.name, parseFloat(e.target.value))}
                                                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-blue-900 rounded-2xl p-6 text-white shadow-lg">
                                <h4 className="font-bold mb-3 flex items-center text-sm uppercase tracking-wider">
                                    <i className="fas fa-info-circle mr-2 text-yellow-400"></i>
                                    Panduan Peta
                                </h4>
                                <ul className="text-sm space-y-3 text-blue-100">
                                    <li className="flex items-start">
                                        <i className="fas fa-mouse-pointer mt-1 mr-2 text-yellow-400 text-xs"></i>
                                        <span>Klik pada objek untuk detail atribut</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-magnifying-glass mt-1 mr-2 text-yellow-400 text-xs"></i>
                                        <span>Gunakan scroll untuk zoom in/out</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-arrows-alt mt-1 mr-2 text-yellow-400 text-xs"></i>
                                        <span>Klik & tahan untuk menggeser peta</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Map Area */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white h-[700px]">
                                <MapComponent
                                    height="100%"
                                    zoom={8}
                                    markers={mapMarkers}
                                    geoJsonLayers={geoJsonLayers}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Download Section (Tabel) */}
                <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6 font-display">
                        <i className="fas fa-download mr-3 text-yellow-500"></i>
                        Download Shapefile (SHP)
                    </h2>
                    <p className="text-gray-700 mb-8 text-lg">
                        Unduh data vektor dalam format shapefile untuk analisis GIS lebih lanjut. Beberapa data memerlukan persetujuan akses.
                    </p>

                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-blue-900 text-white">
                                    <th className="px-6 py-4 text-left font-bold">Nama Dataset</th>
                                    <th className="px-6 py-4 text-left font-bold">Ukuran</th>
                                    <th className="px-6 py-4 text-left font-bold">Akses</th>
                                    <th className="px-6 py-4 text-center font-bold">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {shapefiles.map((file, idx) => (
                                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                                        <td className="px-6 py-4 text-gray-900 font-medium">{file.name}</td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">{file.size}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${file.access === 'Publik' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                                                }`}>
                                                {file.access}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button className={`${file.access === 'Publik' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-orange-500 hover:bg-orange-600'
                                                } text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all active:scale-95`}>
                                                <i className={`fas ${file.access === 'Publik' ? 'fa-download' : 'fa-lock'} mr-2`}></i>
                                                {file.access === 'Publik' ? 'Unduh' : 'Minta Akses'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Statistik Infrastruktur */}
                <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">
                        <i className="fas fa-chart-bar mr-3 text-yellow-500"></i>
                        Statistik Infrastruktur
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statistics.map((stat, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                        <i className={`fas ${stat.icon} text-lg text-white`}></i>
                                    </div>
                                    <div className="text-2xl font-bold text-blue-900">{stat.value}</div>
                                </div>
                                <h3 className="text-sm font-bold text-gray-700">{stat.label}</h3>
                                <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                    <div className={`${stat.color} h-full transition-all duration-1000`} style={{ width: `${stat.percentage}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Metadata */}
                <section className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
                    <h2 className="text-3xl font-bold mb-8 flex items-center">
                        <i className="fas fa-info-circle mr-3 text-yellow-400"></i>
                        Informasi & Metadata
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-blue-200">Sumber Data Utama</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start bg-white/5 p-4 rounded-xl border border-white/10">
                                    <i className="fas fa-landmark text-yellow-400 mr-3 mt-1"></i>
                                    <div>
                                        <p className="font-bold">BIG & LAPAN</p>
                                        <p className="text-sm text-blue-200">Data citra satelit dan batas wilayah administrasi resmi.</p>
                                    </div>
                                </li>
                                <li className="flex items-start bg-white/5 p-4 rounded-xl border border-white/10">
                                    <i className="fas fa-hard-hat text-yellow-400 mr-3 mt-1"></i>
                                    <div>
                                        <p className="font-bold">Dinas PUPR PBD</p>
                                        <p className="text-sm text-blue-200">Data infrastruktur teknis (jalan, jembatan, irigasi).</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-blue-200">Jadwal Pembaruan</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                                    <span className="text-sm">Batas Administrasi</span>
                                    <span className="text-xs font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded">Tahunan</span>
                                </div>
                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                                    <span className="text-sm">Kondisi Jalan</span>
                                    <span className="text-xs font-bold bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Triwulan</span>
                                </div>
                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                                    <span className="text-sm">Data Bencana</span>
                                    <span className="text-xs font-bold bg-red-500/20 text-red-400 px-2 py-1 rounded">Real-time</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DataSpasial;
