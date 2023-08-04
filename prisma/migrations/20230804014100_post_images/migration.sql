/*
  Warnings:

  - You are about to drop the column `postId` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_postId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "postId";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "images" TEXT[];
