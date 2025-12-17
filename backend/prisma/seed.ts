import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient({});

async function main() {
  console.log('🌱 starting the seed...');

  await prisma.$transaction([
    prisma.deliveryCode.deleteMany(),
    prisma.resident.deleteMany(),
  ]);

  const residentOne = await prisma.resident.create({
    data: {
      name: 'River',
      phone: '47999998888',
      unitNumber: '101',
      unitComplement: 'Bloco A',
      createdAt: new Date(),
      deliveryCodes: {
        create: [
          {
            code: 'ABCD',
            provider: 'IFOOD',
          },
          {
            code: '1234',
            provider: 'MERCADO_LIVRE',
          },
        ],
      },
    },
  });

  const residentTwo = await prisma.resident.create({
    data: {
      name: 'Costa',
      phone: '11988887777',
      unitNumber: '205',
      unitComplement: 'Torre B',
      createdAt: new Date(),
    },
  });

  console.log(
    `✅ Seed finished! items: ${residentOne.name} e ${residentTwo.name}`,
  );
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
