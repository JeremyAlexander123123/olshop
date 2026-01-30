"use client";

import Image from 'next/image';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import toast from 'react-hot-toast'; // 1. Import toast

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string | null;
}

export default function ProductCard({ product }: { product: ProductProps }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    // 2. Ganti alert dengan Toast yang keren
    toast.success(`${product.name} masuk keranjang!`, {
      icon: '🛒',
      duration: 3000,
    });
  };

  return (
    // ... (kode return di bawah ini SAMA PERSIS seperti sebelumnya, tidak perlu diubah) ...
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute bottom-4 right-4 translate-y-20 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button 
            onClick={handleAddToCart}
            className={`flex items-center justify-center rounded-full p-3 shadow-lg transition-colors ${isAdded ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-blue-600 hover:text-white'}`}
          >
            {isAdded ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">{formatRupiah(product.price)}</span>
        </div>
      </div>
    </div>
  );
}