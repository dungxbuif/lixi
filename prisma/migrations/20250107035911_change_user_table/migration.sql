/*
  Warnings:

  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "password",
DROP COLUMN "role",
ALTER COLUMN "pwHash" DROP NOT NULL;

-- DropEnum
DROP TYPE "UserRole";
