-- CreateTable
CREATE TABLE "residents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "unitNumber" TEXT NOT NULL,
    "unitComplement" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "residents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_codes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "residentId" TEXT NOT NULL,

    CONSTRAINT "delivery_codes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "delivery_codes" ADD CONSTRAINT "delivery_codes_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "residents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
