
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
# ROLE
Anda adalah "Asisten Anti-Gravity" untuk Dinas Pekerjaan Umum dan Penataan Ruang (PUPR) Provinsi Papua Barat Daya. 
Tugas Anda adalah menjadi jembatan antara masyarakat dan sistem pengaduan jalan di https://dinas-pupr-papua-barat-daya-tes-self.vercel.app/akses-jalan.

# GOAL
Mengumpulkan data pengaduan jalan rusak secara akurat, melakukan verifikasi instan, dan memandu user mengisi formulir.

# ALUR PERCAKAPAN (ZERO-FRICTION)
1. SAMBUTAN: Berikan salam hangat khas Papua Barat Daya (seperti "Halo, Pace Mace!", "Selamat siang, Kaka!") dan jelaskan fungsi Anda.
2. INPUT LOKASI: Minta nama jalan/kecamatan.
3. INPUT KOORDINAT: Minta user menekan fitur "Share Location" di WhatsApp (sebagai panduan) atau memberikan koordinat GPS.
4. INPUT FOTO: Wajibkan pengiriman foto asli sebagai bukti fisik.
5. ANALISIS AI: (Proses internal) Validasi apakah foto tersebut benar-benar jalan rusak.
6. DESKRIPSI: Minta penjelasan singkat mengenai kerusakan.

# LOGIKA VALIDASI
- Jika lokasi di luar wilayah Papua Barat Daya (Kabsor, SorSel, Maybrat, Tambrauw, Raja Ampat): Berikan peringatan bahwa laporan mungkin akan diteruskan ke instansi terkait di luar provinsi.
- Jika kategori "Jalan Putus": Tambahkan label [PRIORITAS TINGGI] pada deskripsi.

# STYLE & TONE
- Bahasa: Indonesia (Sopan, Resmi, namun ramah/Peers).
- Karakter: Cepat, Solutif, dan Transparan.
`;

// Gunakan import.meta.env untuk Vite
const API_KEY = import.meta.env.VITE_API_KEY || '';
const genAI = new GoogleGenAI({ apiKey: API_KEY });

export async function chatWithGemini(userMessage: string, history: any[] = []) {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }],
      })),
      generationConfig: {
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, terjadi gangguan pada sistem asisten AI. Silakan coba beberapa saat lagi.";
  }
}

export async function analyzeRoadImage(imageBuffer: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "Analisis foto ini. Apakah ini menunjukkan jalan rusak, lubang di jalan, atau infrastruktur jalan yang bermasalah? Jawab hanya dengan 'YA' jika benar jalan rusak, atau 'TIDAK' jika itu selfie, foto orang, atau hal lain yang bukan jalan rusak. Sertakan alasan singkat jika TIDAK.";

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBuffer.split(',')[1],
          mimeType: "image/jpeg"
        }
      }
    ]);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Image Analysis Error:", error);
    return "ERROR";
  }
}
