/*
  Warnings:

  - A unique constraint covering the columns `[author]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Blog_author_key" ON "Blog"("author");
