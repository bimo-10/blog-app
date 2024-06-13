/*
  Warnings:

  - You are about to drop the column `author` on the `Blog` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Blog_author_key";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "author";
