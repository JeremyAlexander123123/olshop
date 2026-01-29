import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

// Fungsi untuk ambil data (berjalan di server)
async function getProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }, // Urutkan dari yang terbaru
  });
}

// Tambahkan format mata uang
const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🛍️ Toko Serba Ada
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Gambar Produk */}
              <div className="relative h-48 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Detail Produk */}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold text-lg">
                    {formatRupiah(product.price)}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                    Beli
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-10">Belum ada produk.</p>
        )}
      </div>
    </main>
  );
}