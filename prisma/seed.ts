import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Kopi Susu Gula Aren',
        description: 'Kopi nikmat bikin melek coding seharian.',
        price: 18000,
        image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80',
      },
      {
        name: 'Mechanical Keyboard',
        description: 'Suaranya clicky, enak buat ngetik tugas skripsi.',
        price: 450000,
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
      },
      {
        name: 'Hoodie Programmer',
        description: 'Bahan adem, sablon "It Works on My Machine".',
        price: 250000,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
      },
    ],
  })
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })