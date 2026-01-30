import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Data Dummy Produk (Tech & Developer Gear)
const products = [
  {
    name: 'Keychron K2 Mechanical Keyboard',
    description: 'Keyboard mekanikal wireless dengan switch brown yang tactile. Cocok untuk ngoding berjam-jam tanpa bikin jari pegal.',
    price: 1250000,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
  },
  {
    name: 'Logitech MX Master 3S',
    description: 'Mouse produktivitas terbaik di dunia. Scroll wheel elektromagnetik dan klik yang super silent.',
    price: 1650000,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Headphone noise cancelling terbaik. Hilangkan suara bising sekitarmu dan fokus ke "The Zone".',
    price: 4999000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  },
  {
    name: 'Monitor LG UltraWide 34"',
    description: 'Layar super lebar, bisa buka VS Code, Browser, dan Discord sekaligus tanpa Alt-Tab.',
    price: 5400000,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
  },
  {
    name: 'Herman Miller Aeron Chair',
    description: 'Investasi kesehatan punggungmu. Kursi ergonomis legendaris yang dipakai di kantor Google.',
    price: 18000000,
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80',
  },
  {
    name: 'MacBook Pro M3 Max',
    description: 'Laptop monster untuk compile code super cepat. Render video 4K sambil ngoding? Gampang.',
    price: 32000000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
  },
  {
    name: 'Desk Mat Felt Wool (Dark)',
    description: 'Alas meja estetis bahan wol. Bikin setup meja terlihat minimalis dan mouse lebih presisi.',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?w=800&q=80',
  },
  {
    name: 'Screenbar Monitor Light',
    description: 'Lampu gantung monitor untuk menerangi meja tanpa bikin silau layar. Mata jadi lebih awet.',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1616353071588-708dcff912e2?w=800&q=80',
  },
  {
    name: 'Hoodie "It Works on My Machine"',
    description: 'Outfit wajib programmer saat deployment error. Bahan cotton fleece tebal dan hangat.',
    price: 285000,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
  },
  {
    name: 'Tumbler Kopi Vacuum Insulated',
    description: 'Menjaga kopimu tetap panas selama 6 jam. Teman setia saat begadang fixing bug.',
    price: 199000,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80',
  },
  {
    name: 'Buku "Clean Code" by Uncle Bob',
    description: 'Kitab suci programmer profesional. Belajar cara menulis kode yang rapi dan mudah dibaca.',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
  },
  {
    name: 'USB-C Hub 7-in-1',
    description: 'Dongle penyelamat hidup pengguna MacBook. Ada HDMI, USB 3.0, dan SD Card reader.',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=800&q=80',
  },
]

async function main() {
  console.log('🌱 Start seeding...')

  // Opsional: Hapus data lama biar bersih (uncomment kalau mau reset total)
  await prisma.product.deleteMany()

  // Loop untuk masukkan data satu per satu
  for (const product of products) {
    const result = await prisma.product.create({
      data: product,
    })
    console.log(`✅ Created product: ${result.name}`)
  }

  console.log('🚀 Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })