/*
  Warnings:

  - You are about to drop the column `role_name` on the `roles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[role_type]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_type` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "roles_role_name_key";

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "role_name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role_type" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role_id" SET DEFAULT 2;

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "product_title" TEXT NOT NULL,
    "product_price" INTEGER NOT NULL,
    "product_photo" TEXT NOT NULL,
    "product_description" TEXT NOT NULL,
    "product_status" BOOLEAN NOT NULL DEFAULT false,
    "manufacturing" TEXT NOT NULL,
    "product_handle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "product_rating" INTEGER,
    "product_before_off_price" INTEGER,
    "product_type" TEXT,
    "in_stock" BOOLEAN,
    "life" TEXT,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "category_handle" TEXT NOT NULL,
    "category_images" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductReview" (
    "id" SERIAL NOT NULL,
    "reviewer_name" TEXT NOT NULL,
    "reviewer_email" TEXT NOT NULL,
    "reviewer_photo" TEXT NOT NULL,
    "review_post_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "review_rating" INTEGER NOT NULL,
    "review_description" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "ProductReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_product_title_key" ON "products"("product_title");

-- CreateIndex
CREATE UNIQUE INDEX "roles_role_type_key" ON "roles"("role_type");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
