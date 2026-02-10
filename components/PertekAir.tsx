import React from 'react';

const PertekAir: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
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
