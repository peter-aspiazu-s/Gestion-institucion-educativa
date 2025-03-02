/*
  Warnings:

  - The primary key for the `Estudiante_Materia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `estudianteId` on the `Nota` table. All the data in the column will be lost.
  - You are about to drop the column `materiaId` on the `Nota` table. All the data in the column will be lost.
  - The primary key for the `Profesor_Materia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `estudianteMateriaId` to the `Nota` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Nota" DROP CONSTRAINT "Nota_estudianteId_materiaId_fkey";

-- AlterTable
ALTER TABLE "Estudiante_Materia" DROP CONSTRAINT "Estudiante_Materia_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Estudiante_Materia_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Horario" ALTER COLUMN "usuarioId" DROP NOT NULL,
ALTER COLUMN "materiaId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Nota" DROP COLUMN "estudianteId",
DROP COLUMN "materiaId",
ADD COLUMN     "estudianteMateriaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Profesor_Materia" DROP CONSTRAINT "Profesor_Materia_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Profesor_Materia_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_estudianteMateriaId_fkey" FOREIGN KEY ("estudianteMateriaId") REFERENCES "Estudiante_Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
