/*
  Warnings:

  - You are about to drop the column `curso` on the `Estudiante` table. All the data in the column will be lost.
  - Added the required column `materiaId` to the `Estudiante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estudiante" DROP COLUMN "curso",
ADD COLUMN     "materiaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
