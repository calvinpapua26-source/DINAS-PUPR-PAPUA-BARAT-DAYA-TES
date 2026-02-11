import React, { useState } from 'react';

const PertekAir: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'status'>('form');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4 font-primary">
            Persetujuan Teknis (Pertek) Pemanfaatan Air Permukaan
          </h1>
          <div className="w-24 h-1.5 bg-yellow-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Standar Operasional Prosedur dan Pelayanan Izin Pengusahaan Sumber Daya Air
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12 border border-gray-100">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 text-blue-600">
                <i className="fas fa-info-circle"></i>
              </span>
              Deskripsi Layanan
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Layanan ini mencakup penerbitan Persetujuan Teknis untuk pemanfaatan air permukaan, yang merupakan prasyarat teknis untuk mendapatkan izin pengusahaan sumber daya air. Layanan ini bertujuan untuk memastikan bahwa pemanfaatan air permukaan dilakukan sesuai dengan alokasi air yang ditetapkan dan tidak mengganggu keseimbangan ekosistem sumber daya air.
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-4 border-b-2 border-yellow-500 inline-block pb-1">
                  Persyaratan Administrasi
                </h3>
                <ul className="space-y-3">
                  {[
                    "Surat Permohonan Bermaterai",
                    "Identitas Pemohon (KTP/Badan Usaha)",
                    "Peta Lokasi Pemanfaatan Air (Koordinat)",
                    "Gambar Teknis Rencana Bangunan Pengambilan Air",
                    "Spesifikasi Teknis Pompa/Pintu Air",
                    "Perhitungan Kebutuhan Air",
                    "Dokumen Lingkungan (AMDAL/UKL-UPL/SPPL)"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-4 border-b-2 border-yellow-500 inline-block pb-1">
                  Alur Pelayanan (SOP)
                </h3>
                <ol className="relative border-l border-blue-200 ml-3 space-y-6">
                  {[
                    { title: "Pengajuan Permohonan", desc: "Pemohon mengajukan berkas lengkap melalui loket pelayanan atau sistem online." },
                    { title: "Verifikasi Administrasi", desc: "Petugas memeriksa kelengkapan dokumen administrasi." },
                    { title: "Peninjauan Lapangan", desc: "Tim Teknis melakukan survei lokasi untuk verifikasi teknis." },
                    { title: "Kajian Teknis", desc: "Tim Teknis menyusun rekomendasi teknis berdasarkan hasil survei dan data hidrologi." },
                    { title: "Penerbitan Rekomendasi/Pertek", desc: "Kepala Dinas menerbitkan Persetujuan Teknis jika memenuhi syarat." }
                  ].map((step, idx) => (
                    <li key={idx} className="ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                        <span className="text-blue-600 font-bold text-sm">{idx + 1}</span>
                      </span>
                      <h4 className="flex items-center mb-1 text-lg font-semibold text-gray-900">{step.title}</h4>
                      <p className="mb-2 text-base font-normal text-gray-500">{step.desc}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12 border border-gray-100">
          <div className="bg-gradient-pupr p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <i className="fas fa-cloud-upload-alt mr-4 text-yellow-500"></i>
              Layanan Online Pertek Air
            </h2>
            <p className="text-blue-100 text-lg">Mulailah permohonan Anda secara digital atau cek status berkas yang telah diajukan.</p>
          </div>

          <div className="p-8">
            <div className="flex border-b border-gray-200 mb-8">
              <button
                className={`pb-4 px-6 font-bold text-lg transition-colors relative ${activeTab === 'form' ? 'text-blue-900' : 'text-gray-400 hover:text-gray-600'}`}
                onClick={() => setActiveTab('form')}
              >
                Formulir Permohonan
                {activeTab === 'form' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-900 rounded-t-full"></div>}
              </button>
              <button
                className={`pb-4 px-6 font-bold text-lg transition-colors relative ${activeTab === 'status' ? 'text-blue-900' : 'text-gray-400 hover:text-gray-600'}`}
                onClick={() => setActiveTab('status')}
              >
                Cek Status Berkas
                {activeTab === 'status' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-900 rounded-t-full"></div>}
              </button>
            </div>

            {activeTab === 'form' ? (
              // ... (form content remains same, I'll provide the replacement for the else block)
              <div className="space-y-8 animate-fadeIn">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap / Perusahaan</label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Contoh: PT. Sumber Makmur"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">NIK / NIB</label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Masukkan 16 digit NIK/NIB"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Lokasi Pemanfaatan</label>
                    <select className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                      <option>Pilih Kabupaten/Kota</option>
                      <option>Kab. Sorong</option>
                      <option>Kota Sorong</option>
                      <option>Kab. Raja Ampat</option>
                      <option>Kab. Sorong Selatan</option>
                      <option>Kab. Maybrat</option>
                      <option>Kab. Tambrauw</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Kebutuhan Debit Air (m³/detik)</label>
                    <input
                      type="number"
                      step="0.001"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="0.000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">Unggah Dokumen (PDF, max 10MB)</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-3xl p-10 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <i className="fas fa-file-pdf text-2xl"></i>
                    </div>
                    <p className="text-gray-600 font-medium mb-1">Klik atau seret file ke sini untuk mengunggah</p>
                    <p className="text-gray-400 text-sm">Lampirkan Surat Permohonan & Dokumen Pendukung Lainnya</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                  <i className="fas fa-info-circle text-yellow-600"></i>
                  <p className="text-sm text-yellow-800">Pastikan semua data yang diinput sudah sesuai dengan dokumen fisik Anda.</p>
                </div>

                <button
                  onClick={() => setIsSubmitted(true)}
                  className="w-full bg-blue-900 text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-blue-800 transition-all flex items-center justify-center space-x-3 group"
                >
                  <span>Kirim Permohonan</span>
                  <i className="fas fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                </button>
              </div>
            ) : (
              <div className="animate-fadeIn">
                <div className="max-w-2xl mx-auto py-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Lacak Status Berkas</h3>
                  <div className="relative mb-8">
                    <input
                      type="text"
                      className="w-full pl-14 pr-6 py-5 bg-white border-2 border-gray-100 rounded-3xl shadow-sm focus:border-blue-500 outline-none transition-all text-xl"
                      placeholder="Masukkan Nomor Registrasi / Tracking ID"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                    />
                    <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
                  </div>

                  {trackingId === 'PERTEK-2024-882' ? (
                    <div className="p-8 border-2 border-blue-100 rounded-[32px] bg-blue-50 space-y-6 animate-scaleIn">
                      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm">
                        <span className="text-gray-500 font-bold">STATUS SAAT INI</span>
                        <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full font-black text-xs uppercase">Verifikasi Lipu</span>
                      </div>

                      <div className="space-y-4">
                        {[
                          { label: 'Pendaftaran Online', date: '10 Feb 2026', done: true },
                          { label: 'Verifikasi Administrasi', date: '11 Feb 2026', done: true },
                          { label: 'Peninjauan Lapangan', date: 'Estimasi 15 Feb 2026', done: false },
                          { label: 'Kajian Teknis', date: '-', done: false },
                          { label: 'Penerbitan Rekomendasi', date: '-', done: false }
                        ].map((step, idx) => (
                          <div key={idx} className="flex items-center space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                              <i className={`fas ${step.done ? 'fa-check' : 'fa-clock'} text-xs`}></i>
                            </div>
                            <div className="flex-grow">
                              <p className={`font-bold ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
                              <p className="text-xs text-gray-400">{step.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <button className="w-full bg-blue-900 text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-800 transition-all mb-8">
                        Cari Berkas
                      </button>

                      <div className="p-8 border-2 border-gray-50 rounded-3xl bg-gray-50/50">
                        <p className="text-center text-gray-500 font-medium leading-relaxed">
                          Gunakan ID pendaftaran yang Anda terima setelah mengirimkan formulir.<br />
                          Contoh: <span className="text-blue-600 font-bold">PERTEK-2024-882</span>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {isSubmitted && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-[40px] p-12 max-w-lg w-full text-center shadow-2xl animate-scaleIn">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <i className="fas fa-check text-4xl"></i>
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4">Berhasil Terkirim!</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Permohonan Anda telah diterima oleh sistem. Silakan simpan Tracking ID berikut untuk memantau status berkas Anda.
              </p>
              <div className="bg-gray-50 p-6 rounded-3xl mb-8 border border-gray-100 border-dashed">
                <span className="text-sm text-gray-400 font-bold uppercase tracking-widest block mb-2">Tracking ID</span>
                <span className="text-3xl font-black text-blue-900">PERTEK-2024-882</span>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-blue-900 text-white py-5 rounded-2xl font-bold text-lg hover:shadow-xl transition-all"
              >
                Kembali ke Layanan
              </button>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-600">
            <div className="text-blue-600 text-3xl mb-4"><i className="fas fa-clock"></i></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Waktu Layanan</h3>
            <p className="text-gray-600">Estimasi 14 - 30 Hari Kerja (setelah dokumen dinyatakan lengkap)</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-yellow-500">
            <div className="text-yellow-500 text-3xl mb-4"><i className="fas fa-coins"></i></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Biaya</h3>
            <p className="text-gray-600">Gratis (Tidak dipungut biaya restribusi layanan teknis)</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-500">
            <div className="text-green-500 text-3xl mb-4"><i className="fas fa-file-contract"></i></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Dasar Hukum</h3>
            <p className="text-gray-600 text-sm">UU No. 17 Tahun 2019 tentang Sumber Daya Air, Peraturan Menteri PUPR terkait.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PertekAir;
