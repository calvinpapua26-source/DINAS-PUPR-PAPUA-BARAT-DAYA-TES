/**
 * WhatsApp Service (BlazWA Integration)
 * Solusi untuk mengirim pesan otomatis via REST API Blazwa
 */

const BLAZWA_API_KEY = import.meta.env.VITE_BLAZWA_API_KEY;
const BLAZWA_ENDPOINT = 'https://app.blazwa.com/api/send-message';

export interface BlazwaResponse {
    status: boolean;
    message: string;
    data?: any;
}

/**
 * Mengirim pesan teks via BlazWA API
 * @param to Nomor tujuan (format 628...)
 * @param message Isi pesan
 */
export async function sendBlazwaMessage(to: string, message: string): Promise<BlazwaResponse> {
    if (!BLAZWA_API_KEY || BLAZWA_API_KEY.includes('Paste_Kode')) {
        console.warn('WhatsApp Service: BLAZWA_API_KEY belum diatur di .env');
        return { status: false, message: 'API Key belum diatur' };
    }

    try {
        const response = await fetch(BLAZWA_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${BLAZWA_API_KEY}`
            },
            body: JSON.stringify({
                number: to,
                message: message
            })
        });

        const data = await response.json();
        console.log('BlazWA API Response:', data);

        return {
            status: data.status === true || data.status === 'success',
            message: data.message || 'Selesai',
            data: data
        };
    } catch (error) {
        console.error('BlazWA API Error:', error);
        return { status: false, message: 'Gagal terhubung ke server BlazWA' };
    }
}
