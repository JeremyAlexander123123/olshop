"use client";

export default function Hero() {
  const handleScroll = () => {
    // Cari elemen dengan ID 'products' dan scroll ke sana dengan mulus
    const productSection = document.getElementById('products');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Noise Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 relative z-10 pt-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl mb-6 drop-shadow-sm">
            Upgrade Setup Codingmu
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-blue-100 mb-10 font-light leading-relaxed">
            Temukan perlengkapan terbaik untuk programmer. Mulai dari keyboard mekanikal hingga aksesori produktivitas.
          </p>
          
          {/* Tombol pakai onClick, bukan Link href */}
          <button 
            onClick={handleScroll}
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-bold hover:bg-blue-50 transition shadow-lg hover:shadow-xl hover:scale-105 transform duration-200 cursor-pointer"
          >
            Belanja Sekarang
          </button>
        </div>
      </section>
  );
}