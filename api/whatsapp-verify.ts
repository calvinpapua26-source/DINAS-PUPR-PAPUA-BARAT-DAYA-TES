
// api/whatsapp-verify.ts
// Serverless function untuk menangani Webhook dari BlazWA
import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    try {
        const { sender, message, location } = req.body;
        const BLAZWA_API_KEY = process.env.VITE_BLAZWA_API_KEY;

        // URL Web Pace (Link Pintar)
        const WEB_URL = "https://dinas-pupr-papua-barat-daya-git-3868ab-cevas-projects-689006cb.vercel.app/akses-jalan";

        console.log('Webhook Received:', req.body);

        // 1. Logika: Jika warga kirim Lokasi (Share Loc)
        if (location && (location.latitude || location.lat) && (location.longitude || location.lng)) {
            const lat = location.latitude || location.lat;
            const lng = location.longitude || location.lng;

            // Pesan Verifikasi Otomatis
            const balasan = `*VERIFIKASI LAPORAN OTOMATIS* ✅
    
Halo Pace/Mace, koordinat Anda telah kami terima:
📍 *Lokasi:* ${lat}, ${lng}

Sistem sedang mencocokkan dengan peta digital PUPR. 
Silakan cek posisi laporan Anda secara live di peta kami:
🔗 ${WEB_URL}?lat=${lat}&lng=${lng}

*Status:* Laporan telah diteruskan ke Admin Anti-Gravity untuk pengecekan lapangan.`;

            // 2. Kirim Balasan via BlazWA
            await axios.post('https://app.blazwa.com/api/send-message', {
                device_key: BLAZWA_API_KEY, // Menggunakan parameter device_key
                token: BLAZWA_API_KEY,      // Fallback token
                receiver: sender,
                message: balasan
            });

            return res.status(200).json({ success: true, message: 'Balasan terkirim' });
        }

        // Respon standar jika hanya kirim teks
        return res.status(200).send('OK');
    } catch (error: any) {
        console.error("Gagal proses webhook:", error.response?.data || error.message);
        return res.status(200).json({ status: 'error', reason: 'Internal failure' });
    }
}
