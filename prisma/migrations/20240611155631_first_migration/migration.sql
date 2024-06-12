-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "emali" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emali_key" ON "User"("emali");
