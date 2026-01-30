import { ImageResponse } from 'next/og'

// Konfigurasi ukuran gambar (favicon standar)
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Generate gambar icon
export default function Icon() {
  return new ImageResponse(
    (
      // Elemen JSX (HTML/CSS) untuk menggambar logo
      <div
        style={{
          fontSize: 20,
          background: 'linear-gradient(to bottom right, #2563eb, #4f46e5)', // Biru ke Indigo
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '8px', // Membulatkan sudut (rounded)
          fontWeight: 700,
        }}
      >
        S
      </div>
    ),
    // Metadata ImageResponse
    {
      ...size,
    }
  )
}