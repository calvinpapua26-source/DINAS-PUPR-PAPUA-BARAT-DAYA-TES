import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';
import RoadBridgeMatrix from './RoadBridgeMatrix';
import { sendBlazwaMessage } from '../services/whatsappService';

const AksesJalan: React.FC = () => {
    const navigate = useNavigate();
    const [reportForm, setReportForm] = useState({
        location: '',
        description: '',
        coordinates: '',
    });

    // States for Live Map Integration
    const [visitorMarker, setVisitorMarker] = useState<[number, number] | null>(null);
    const [mapConfig, setMapConfig] = useState({
        center: [-1.3361, 132.2375] as [number, number],
        zoom: 8
    });

    // State for Collapsible Matrix
    const [showMatrix, setShowMatrix] = useState(false);

    const roadStats = [
        { type: 'Jalan Nasional', length: '245 km', condition: 'Baik: 78%', color: 'bg-blue-600' },
        { type: 'Jalan Provinsi', length: '432 km', condition: 'Baik: 65%', color: 'bg-yellow-600' },
        { type: 'Jalan Kabupaten/Kota', length: '1,234 km', condition: 'Baik: 52%', color: 'bg-green-600' },
    ];

    const ongoingProjects = [
        {
            name: 'Pembangunan Jalan Trans Papua Segmen Sorong-Klamono',
            progress: 75,
            status: 'Dalam Pelaksanaan',
            timeline: 'Jan 2024 - Des 2024',
        },
        {
            name: 'Perbaikan Jalan Provinsi Rute Ayamaru-Aifat',
            progress: 45,
            status: 'Dalam Pelaksanaan',
            timeline: 'Mar 2024 - Sep 2024',
        },
        {
            name: 'Pembukaan Jalan Baru Akses Distrik Teminabuan',
            progress: 30,
            status: 'Tahap Awal',
            timeline: 'Feb 2024 - Nov 2024',
        },
    ];

    const mapMarkers: Array<{ position: [number, number]; title: string; description?: string }> = [
        { position: [-0.9618, 131.3524], title: "Proyek Trans Papua", description: "Segmen Sorong-Klamono (75%)" },
        { position: [-1.2255, 132.3389], title: "Perbaikan Jalan Ayamaru", description: "Rute Ayamaru-Aifat (45%)" },
        { position: [-1.4421, 132.2533], title: "Jalan Baru Teminabuan", description: "Akses Distrik Teminabuan (30%)" }
    ];

    // 1. State Management for GIS
    const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
        'Jalan Nasional': true,
        'Jalan Provinsi': true,
        'Jembatan Nasional': true,
    });
    const [layerOpacities, setLayerOpacities] = useState<Record<string, number>>({});

    const toggleLayer = (name: string) => {
        setActiveLayers(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const handleOpacityChange = (name: string, value: number) => {
        setLayerOpacities(prev => ({ ...prev, [name]: value }));
    };

    const gisLayers = useMemo(() => [
        { url: '/data/jalan nasional.json', name: 'Jalan Nasional', color: '#2563eb', weight: 4 },
        { url: '/data/jlnprov.json', name: 'Jalan Provinsi', color: '#ea580c', weight: 3 },
        { url: '/data/jembatan nasional.json', name: 'Jembatan Nasional', color: '#b91c1c', weight: 6 },
    ], []);

    const geoJsonLayers = useMemo(() =>
        gisLayers.map(layer => ({
            ...layer,
            visible: !!activeLayers[layer.name],
            opacity: layerOpacities[layer.name] !== undefined ? layerOpacities[layer.name] : 0.8,
            style: { color: layer.color, weight: layer.weight }
        })), [gisLayers, activeLayers, layerOpacities]);

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert('Browser Anda tidak mendukung fitur lokasi.');
            return;
        }

        alert('Sedang mengambil lokasi, mohon izinkan akses jika diminta oleh browser...');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setReportForm(prev => ({
                    ...prev,
                    coordinates: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
                }));

                // Update map to visitor's position
                setVisitorMarker([latitude, longitude]);
                setMapConfig({
                    center: [latitude, longitude],
                    zoom: 14 // Zoom in to show location clearly
                });

                alert('Lokasi berhasil diambil!');
            },
            (error) => {
                let errorMessage = 'Gagal mengambil lokasi.';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Akses lokasi ditolak oleh pengguna.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Informasi lokasi tidak tersedia.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Waktu permintaan lokasi habis.';
                        break;
                }
                alert(errorMessage);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    };

    const handleReportSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const phoneNumber = '6282198933685';
        const message = `Halo Dinas PUPR Papua Barat Daya, saya ingin melaporkan jalan rusak.
        
*Lokasi:* ${reportForm.location}
*Koordinat:* ${reportForm.coordinates || '-'}
*Deskripsi:* ${reportForm.description}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        sendBlazwaMessage(phoneNumber, message).then(res => {
            if (res.status) console.log('BlazWA: Notifikasi formulir terkirim');
        });

        window.open(whatsappUrl, '_blank');

        alert('Laporan Anda telah disiapkan. Anda akan diarahkan ke WhatsApp untuk mengirim laporan.');
        setReportForm({ location: '', description: '', coordinates: '' });
    };

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
                    <h1 className="text-4xl font-extrabold mb-4">Akses Jalan</h1>
                    <p className="text-xl text-blue-100 max-w-3xl">
                        Informasi Infrastruktur Konektivitas di Provinsi Papua Barat Daya
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

                {/* Tombol Toggle Matriks Utama */}
                <div className="flex justify-center">
                    <button
                        onClick={() => setShowMatrix(!showMatrix)}
                        className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl hover:scale-105 active:scale-95 ${showMatrix
                            ? 'bg-red-50 text-red-600 border-2 border-red-200'
                            : 'bg-blue-900 text-white border-2 border-blue-900'
                            }`}
                    >
                        <i className={`fas ${showMatrix ? 'fa-times-circle' : 'fa-chart-bar'}`}></i>
                        <span>{showMatrix ? 'Sembunyikan Data Matriks' : 'Lihat Matriks Status Jalan & Jembatan'}</span>
                    </button>
                </div>

                {showMatrix && (
                    <div className="space-y-16 animate-in fade-in slide-in-from-top-4 duration-700">
                        {/* Status Jalan */}
                        <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100">
                            <h2 className="text-3xl font-bold text-blue-900 mb-6 font-primary">
                                <i className="fas fa-road mr-3 text-yellow-500"></i>
                                Status Jalan
                            </h2>
                            <p className="text-gray-700 mb-8 text-lg">
                                Informasi klasifikasi dan kondisi jalan di Papua Barat Daya berdasarkan kewenangan pengelolaan.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6">
                                {roadStats.map((road, idx) => (
                                    <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all hover:shadow-xl group">
                                        <div className={`w-16 h-16 ${road.color} rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                            <i className="fas fa-road text-2xl text-white"></i>
                                        </div>
                                        <h3 className="text-xl font-extrabold text-gray-900 mb-3">{road.type}</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600 font-medium">Panjang Total:</span>
                                                <span className="font-bold text-blue-900">{road.length}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600 font-medium">Kondisi:</span>
                                                <span className="font-bold text-green-600">{road.condition}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Road and Bridge Matrix Section */}
                        <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12 overflow-hidden border border-gray-100">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-blue-900">
                                    <i className="fas fa-table mr-3 text-yellow-500"></i>
                                    Matriks Penyelenggaraan
                                </h2>
                                <p className="text-gray-700 mt-2 text-lg">
                                    Data teknis dan status kemantapan infrastruktur jalan dan jembatan secara mendetail.
                                </p>
                            </div>
                            <RoadBridgeMatrix />
                        </section>
                    </div>
                )}

                {/* Peta Jaringan Jalan & Foto Kondisi */}
                <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-blue-900">
                                <i className="fas fa-map mr-3 text-yellow-500"></i>
                                Peta Jaringan Jalan Interaktif
                            </h2>
                            <p className="text-gray-700 mt-2 text-lg">
                                Visualisasi infrastruktur jalan provinsi dan nasional yang terintegrasi.
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Control Panel */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm h-full max-h-[600px] flex flex-col">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center flex-shrink-0">
                                    <i className="fas fa-layer-group mr-2 text-blue-600"></i>
                                    Kontrol Layer
                                </h3>
                                <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                                    {gisLayers.map(layer => (
                                        <div key={layer.name} className="space-y-2">
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
                                                        <span className="text-[10px] font-black text-blue-600">{Math.round((layerOpacities[layer.name] ?? 0.8) * 100)}%</span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="1"
                                                        step="0.1"
                                                        value={layerOpacities[layer.name] ?? 0.8}
                                                        onChange={(e) => handleOpacityChange(layer.name, parseFloat(e.target.value))}
                                                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Interactive Map Area */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white h-[600px]">
                                <MapComponent
                                    markers={visitorMarker ? [
                                        ...mapMarkers,
                                        { position: visitorMarker, title: "Lokasi Anda", description: "Posisi pelaporan saat ini" }
                                    ] : mapMarkers}
                                    height="100%"
                                    center={mapConfig.center}
                                    zoom={mapConfig.zoom}
                                    geoJsonLayers={geoJsonLayers}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <i className="fas fa-layer-group mr-2 text-blue-600"></i>
                            Keterangan Peta
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-1.5 bg-blue-600 rounded"></div>
                                <span className="text-sm font-semibold text-gray-700">Jalan Nasional</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-1.5 bg-orange-600 rounded"></div>
                                <span className="text-sm font-semibold text-gray-700">Jalan Provinsi</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-4 h-4 rounded-full bg-red-700"></div>
                                <span className="text-sm font-semibold text-gray-700">Jembatan Nasional</span>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Laporan Kerusakan */}
                <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">
                        <i className="fas fa-exclamation-triangle mr-3 text-yellow-500"></i>
                        Pengaduan Jalan Rusak
                    </h2>
                    <p className="text-gray-700 mb-8 text-lg">
                        Laporkan kondisi jalan yang rusak, berlubang, atau putus. Bantu kami memperbaiki infrastruktur dengan partisipasi Anda!
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Form */}
                        <div className="bg-blue-50 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Formulir Pengaduan</h3>
                            <form onSubmit={handleReportSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Lokasi Jalan <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={reportForm.location}
                                        onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
                                        placeholder="Contoh: Jl. Trans Papua Km 15, Sorong"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2 flex items-center justify-between">
                                        <span>Koordinat GPS (Opsional)</span>
                                        <button
                                            type="button"
                                            onClick={handleGetLocation}
                                            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors flex items-center"
                                        >
                                            <i className="fas fa-location-arrow mr-1"></i>
                                            Gunakan Lokasi Saat Ini
                                        </button>
                                    </label>
                                    <input
                                        type="text"
                                        value={reportForm.coordinates}
                                        onChange={(e) => setReportForm({ ...reportForm, coordinates: e.target.value })}
                                        placeholder="Contoh: -0.8618, 131.2524"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Deskripsi Kerusakan <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        required
                                        value={reportForm.description}
                                        onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                                        placeholder="Jelaskan kondisi kerusakan jalan..."
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Foto Lapangan (Gunakan Kamera Handphone)
                                    </label>
                                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer group">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            capture="environment"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    alert('Foto berhasil diambil: ' + e.target.files[0].name);
                                                }
                                            }}
                                        />
                                        <div className="space-y-2">
                                            <i className="fas fa-camera text-4xl text-gray-400 group-hover:text-blue-500 transition-colors"></i>
                                            <p className="text-gray-600 text-sm font-semibold text-blue-900 leading-tight">Klik untuk Ambil Foto Langsung</p>
                                            <p className="text-gray-400 text-xs mt-1">Otomatis membuka kamera handphone</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-900 hover:bg-blue-800 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95"
                                >
                                    <i className="fas fa-paper-plane mr-2"></i>
                                    Kirim Laporan
                                </button>
                            </form>
                        </div>

                        {/* Info */}
                        <div className="space-y-6">
                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-2xl">
                                <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                                    <i className="fas fa-info-circle text-yellow-600 mr-2"></i>
                                    Cara Melaporkan
                                </h4>
                                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                    <li>Isi formulir dengan lengkap dan jelas</li>
                                    <li>Sertakan koordinat GPS untuk akurasi lokasi</li>
                                    <li>Unggah foto kondisi jalan (sangat membantu)</li>
                                    <li>Tim kami akan menindaklanjuti dalam 3-7 hari kerja</li>
                                </ol>
                            </div>

                            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-2xl">
                                <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                                    <i className="fas fa-check-circle text-green-600 mr-2"></i>
                                    Manfaat Pelaporan
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <i className="fas fa-chevron-right text-green-600 mr-2 mt-1"></i>
                                        <span>Mempercepat perbaikan jalan rusak</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-chevron-right text-green-600 mr-2 mt-1"></i>
                                        <span>Meningkatkan keselamatan berkendara</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-chevron-right text-green-600 mr-2 mt-1"></i>
                                        <span>Partisipasi aktif dalam pembangunan daerah</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-2xl">
                                <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                                    <i className="fas fa-headset text-blue-600 mr-2"></i>
                                    Butuh Bantuan?
                                </h4>
                                <p className="text-gray-700 mb-3">
                                    Hubungi layanan pengaduan kami:
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <i className="fas fa-phone text-blue-600"></i>
                                        <span className="text-gray-700">(0951) 123-456</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <i className="fab fa-whatsapp text-green-600"></i>
                                        <span className="text-gray-700">0821-9893-3685</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Proyek Berjalan */}
                <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">
                        <i className="fas fa-hard-hat mr-3 text-yellow-500"></i>
                        Proyek Berjalan
                    </h2>
                    <p className="text-gray-700 mb-8 text-lg">
                        Update berkala mengenai perbaikan atau pembukaan jalan baru di Papua Barat Daya.
                    </p>

                    <div className="space-y-6">
                        {ongoingProjects.map((project, idx) => (
                            <div key={idx} className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                                        <div className="flex flex-wrap gap-3 text-sm">
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                                                <i className="fas fa-calendar-alt mr-1"></i>
                                                {project.timeline}
                                            </span>
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                                                <i className="fas fa-tasks mr-1"></i>
                                                {project.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right ml-4">
                                        <div className="text-3xl font-bold text-blue-900">{project.progress}%</div>
                                        <div className="text-sm text-gray-500">Progress</div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-blue-600 to-blue-400 h-3 rounded-full transition-all duration-500"
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <button className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95">
                            <i className="fas fa-list mr-2"></i>
                            Lihat Semua Proyek
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AksesJalan;
