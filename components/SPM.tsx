import React from 'react';
import { useNavigate } from 'react-router-dom';

const SPM: React.FC = () => {
    const navigate = useNavigate();
    const pillars = [
        {
            title: 'Pekerjaan Umum (Akses Air Minum & Sanitasi)',
            icon: 'fa-tint',
            color: 'bg-blue-600',
            items: [
                {
                    name: 'Pemenuhan Kebutuhan Air Minum',
                    description: 'Menjamin ketersediaan air minum layak minimal 60 liter per orang per hari untuk kebutuhan domestik.',
                    icon: 'fa-water',
                },
                {
                    name: 'Akses Sanitasi Layak',
                    description: 'Penyediaan sistem pengelolaan air limbah domestik yang aman dan terintegrasi untuk mencegah pencemaran lingkungan.',
                    icon: 'fa-toilet',
                },
            ],
            target: 'Meningkatkan persentase rumah tangga dengan akses air minum dan sanitasi layak di 6 Kabupaten/Kota di Papua Barat Daya.',
        },
        {
            title: 'Perumahan Rakyat',
            icon: 'fa-home',
            color: 'bg-green-600',
            items: [
                {
                    name: 'Rehabilitasi Rumah Tidak Layak Huni (RTLH)',
                    description: 'Memberikan bantuan perbaikan rumah bagi masyarakat yang terkena dampak bencana atau relokasi program pemerintah provinsi.',
                    icon: 'fa-hammer',
                },
                {
                    name: 'Penyediaan Hunian Layak',
                    description: 'Memastikan standarisasi luasan minimal 7,2 m² per orang dengan struktur bangunan yang aman dan sehat.',
                    icon: 'fa-house-user',
                },
                {
                    name: 'Prasarana, Sarana, dan Utilitas (PSU)',
                    description: 'Pembangunan jalan lingkungan, drainase, dan penerangan pada kompleks perumahan masyarakat.',
                    icon: 'fa-road',
                },
            ],
            target: 'Fokus pada bantuan bagi masyarakat berpenghasilan rendah untuk meningkatkan kualitas hunian.',
        },
        {
            title: 'Ketangguhan Infrastruktur (Bencana)',
            icon: 'fa-shield-alt',
            color: 'bg-red-600',
            items: [
                {
                    name: 'Respon Cepat Infrastruktur',
                    description: 'Penanganan darurat jalan provinsi yang terputus akibat bencana alam (longsor/banjir) dalam waktu maksimal 24 jam untuk pemulihan akses.',
                    icon: 'fa-exclamation-triangle',
                },
                {
                    name: 'Penyediaan Air Bersih Darurat',
                    description: 'Pendistribusian mobil tangki air bersih ke lokasi pengungsian saat terjadi status tanggap darurat bencana.',
                    icon: 'fa-truck',
                },
            ],
            target: 'Penanganan darurat untuk memastikan akses dasar masyarakat saat terjadi bencana.',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-pupr text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button
                        onClick={() => navigate('/')}
                        className="mb-6 flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors group"
                    >
                        <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                        <span className="font-semibold">Kembali ke Beranda</span>
                    </button>
                    <h1 className="text-4xl font-extrabold mb-4">Standar Pelayanan Minimal (SPM)</h1>
                    <p className="text-xl text-blue-100 max-w-3xl">
                        Komitmen Dinas PUPR dalam Memenuhi Hak Dasar Masyarakat Papua Barat Daya
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

                {/* Introduction */}
                <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                    <div className="flex items-start space-x-4 mb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-clipboard-check text-2xl text-blue-900"></i>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-blue-900 mb-4">Tentang SPM PUPR</h2>
                            <p className="text-gray-700 leading-relaxed text-lg mb-4">
                                Berdasarkan Peraturan Pemerintah, Dinas PUPR Provinsi Papua Barat Daya berkomitmen untuk memenuhi
                                hak dasar masyarakat melalui <strong>3 pilar utama pelayanan</strong> yang mencakup pekerjaan umum,
                                perumahan rakyat, dan ketangguhan infrastruktur.
                            </p>
                            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                                <p className="text-gray-700">
                                    <i className="fas fa-info-circle text-blue-600 mr-2"></i>
                                    Sebagai provinsi baru, fokus utama SPM adalah pada identifikasi Rumah Tidak Layak Huni (RTLH)
                                    dan perluasan jaringan air bersih untuk seluruh masyarakat Papua Barat Daya.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3 Pillars */}
                {pillars.map((pillar, idx) => (
                    <section key={idx} className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                        <div className="flex items-center mb-6">
                            <div className={`w-16 h-16 ${pillar.color} rounded-full flex items-center justify-center mr-4 shadow-lg`}>
                                <i className={`fas ${pillar.icon} text-3xl text-white`}></i>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-blue-900">{idx + 1}. {pillar.title}</h2>
                            </div>
                        </div>

                        <div className="space-y-6 mb-6">
                            {pillar.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border-l-4 border-blue-600">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <i className={`fas ${item.icon} text-xl text-blue-900`}></i>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                                            <p className="text-gray-700 leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-2xl">
                            <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                                <i className="fas fa-bullseye text-yellow-600 mr-2"></i>
                                Target Capaian
                            </h4>
                            <p className="text-gray-700">{pillar.target}</p>
                        </div>
                    </section>
                ))}

                {/* Laporan Capaian */}
                <section className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl shadow-lg p-8 md:p-12 text-white">
                    <h2 className="text-3xl font-bold mb-6">
                        <i className="fas fa-chart-line mr-3 text-yellow-400"></i>
                        Laporan Capaian SPM Tahun 2026
                    </h2>
                    <p className="text-blue-100 mb-8 text-lg">
                        Transparansi dan akuntabilitas pelaksanaan Standar Pelayanan Minimal di Papua Barat Daya.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="text-5xl font-bold mb-2">68%</div>
                            <div className="text-blue-100">Akses Air Minum Layak</div>
                            <div className="text-sm text-blue-200 mt-2">Target: 75% di akhir 2026</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="text-5xl font-bold mb-2">342</div>
                            <div className="text-blue-100">Unit RTLH Direhabilitasi</div>
                            <div className="text-sm text-blue-200 mt-2">Target: 500 unit tahun 2026</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="text-5xl font-bold mb-2">24 Jam</div>
                            <div className="text-blue-100">Respon Darurat Bencana</div>
                            <div className="text-sm text-blue-200 mt-2">Sesuai standar SPM</div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95">
                            <i className="fas fa-download mr-2"></i>
                            Unduh Laporan Lengkap SPM 2026
                        </button>
                    </div>
                </section>

                {/* Informasi Pengaduan */}
                <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">
                        <i className="fas fa-headset mr-3 text-yellow-500"></i>
                        Informasi Pengaduan SPM
                    </h2>
                    <p className="text-gray-700 mb-8 text-lg">
                        Jika Anda merasa pelayanan dasar di atas belum terpenuhi di wilayah Anda, silakan hubungi kami:
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-map-marker-alt text-blue-600 mr-2"></i>
                                Posko SPM PUPR
                            </h3>
                            <p className="text-gray-700 mb-4">
                                Kantor Dinas PUPR Provinsi Papua Barat Daya<br />
                                Jalan Pendidikan Nomor 02, Kilometer 8, Kelurahan Klabulu, Distrik Malaimsimsa, Kota Sorong, Provinsi Papua Barat Daya
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 text-gray-700">
                                    <i className="fas fa-phone text-blue-600"></i>
                                    <span>(0951) 123456</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-700">
                                    <i className="fas fa-envelope text-blue-600"></i>
                                    <span>spm.pupr@pabd.go.id</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-exclamation-circle text-green-600 mr-2"></i>
                                Jenis Pengaduan yang Dapat Dilaporkan
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <i className="fas fa-check text-green-600 mr-2 mt-1"></i>
                                    <span>Tidak tersedia akses air minum layak</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-check text-green-600 mr-2 mt-1"></i>
                                    <span>Sanitasi tidak memadai atau tidak berfungsi</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-check text-green-600 mr-2 mt-1"></i>
                                    <span>Rumah tidak layak huni belum mendapat bantuan</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-check text-green-600 mr-2 mt-1"></i>
                                    <span>Jalan terputus akibat bencana belum ditangani</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
                        <h3 className="text-2xl font-bold mb-4">Laporkan Kendala Layanan Dasar</h3>
                        <p className="text-blue-100 mb-6">
                            Tim kami siap membantu Anda dalam memenuhi hak dasar pelayanan infrastruktur
                        </p>
                        <button className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95">
                            <i className="fas fa-paper-plane mr-2"></i>
                            Kirim Laporan Pengaduan
                        </button>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default SPM;
