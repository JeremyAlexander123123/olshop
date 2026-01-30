import { PrismaClient } from '@prisma/client';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero'; // Import Hero baru

const prisma = new PrismaClient();

async function getProducts() {
  return await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Panggil komponen Hero disini */}
      <Hero />

      {/* Pastikan ID ini tetap ada untuk target scroll */}
      <main id="products" className="mx-auto max-w-6xl px-4 sm:px-6 py-24 scroll-mt-20">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-gray-900">Katalog Produk</h2>
            <p className="text-gray-500">Pilihan terbaik untuk menunjang produktivitas.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">Belum ada produk yang tersedia.</p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t py-12 mt-20">
        <div className="text-center text-gray-500 text-sm">
          &copy; 2026 ShopDev. Dibuat dengan Next.js & PostgreSQL.
        </div>
      </footer>
    </div>
  );
}