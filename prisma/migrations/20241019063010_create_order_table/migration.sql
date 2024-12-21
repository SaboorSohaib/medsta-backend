-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "products" JSONB NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "order_status" TEXT NOT NULL DEFAULT 'pending',
    "order_notes" TEXT,
    "total_price" INTEGER NOT NULL,
    "total_product" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_address" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_address_fkey" FOREIGN KEY ("user_address") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
