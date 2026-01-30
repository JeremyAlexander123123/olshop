"use client";

import Link from 'next/link';
import { ShoppingCart, Trash2, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast'; // 1. Import Toast

export default function Navbar() {
  const { items, removeFromCart, totalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  // 2. Fungsi Baru: Verifikasi & Hapus
  const handleRemoveItem = (id: string, name: string) => {
    // A. Second Verification (Dialog Konfirmasi)
    const isConfirmed = window.confirm(`Apakah Anda yakin ingin membatalkan pembelian "${name}"?`);

    if (isConfirmed) {
      removeFromCart(id);
      
      // B. Notifikasi Penghapusan
      toast.error(`${name} dihapus dari keranjang`, {
        duration: 3000,
        position: 'bottom-right',
        style: {
            background: '#fff',
            color: '#ef4444', // Warna merah
            border: '1px solid #ef4444',
        },
        icon: '🗑️',
      });
      
      // Tutup dropdown jika barang habis (opsional)
      if (items.length === 1) setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-xl font-bold text-gray-900">ShopDev</span>
        </Link>

        {/* Cart Icon & Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="relative p-2 hover:bg-gray-100 rounded-full transition group"
          >
            <ShoppingCart className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-bounce">
                {items.length}
              </span>
            )}
          </button>

          {/* Cart Dropdown */}
          {isOpen && (
            <div className="absolute right-0 mt-4 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-5 duration-200">
              <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <h3 className="font-semibold text-gray-700">Keranjang ({items.length})</h3>
                <button onClick={() => setIsOpen(false)} className="hover:bg-gray-200 p-1 rounded-full"><X className="h-4 w-4 text-gray-500" /></button>
              </div>
              
              <div className="max-h-80 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-2">
                    <ShoppingCart className="h-8 w-8 opacity-20" />
                    <p className="text-sm">Keranjang kosong</p>
                  </div>
                ) : (
                  items.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors group/item">
                      <div className="relative h-12 w-12 rounded-md overflow-hidden bg-gray-200 shrink-0 border border-gray-200">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-gray-800">{item.name}</p>
                        <p className="text-xs text-blue-600 font-bold">{formatRupiah(item.price)}</p>
                      </div>
                      
                      {/* 3. Tombol Hapus dengan Handler Baru */}
                      <button 
                        onClick={() => handleRemoveItem(item.id, item.name)} 
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                        title="Hapus item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="p-4 bg-gray-50 border-t">
                  <div className="flex justify-between mb-4 font-bold text-gray-800">
                    <span>Total:</span>
                    <span>{formatRupiah(totalPrice)}</span>
                  </div>
                  <button 
                    onClick={() => toast.success('Fitur checkout segera hadir!')}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-600/20"
                  >
                    Checkout Sekarang
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}