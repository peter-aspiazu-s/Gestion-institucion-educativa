/*
  Warnings:

  - You are about to drop the `Estudiante` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "Rol" ADD VALUE 'estudiante';

-- DropForeignKey
ALTER TABLE "Estudiante" DROP CONSTRAINT "Estudiante_horarioId_fkey";

-- DropForeignKey
ALTER TABLE "Estudiante" DROP CONSTRAINT "Estudiante_materiaId_fkey";

-- DropForeignKey
ALTER TABLE "Estudiante" DROP CONSTRAINT "Estudiante_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Nota" DROP CONSTRAINT "Nota_estudianteId_fkey";

-- DropForeignKey
ALTER TABLE "Nota" DROP CONSTRAINT "Nota_materiaId_fkey";

-- DropTable
DROP TABLE "Estudiante";

-- CreateTable
CREATE TABLE "Estudiante_Materia" (
    "usuarioId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,

    CONSTRAINT "Estudiante_Materia_pkey" PRIMARY KEY ("usuarioId","materiaId")
);

-- AddForeignKey
ALTER TABLE "Estudiante_Materia" ADD CONSTRAINT "Estudiante_Materia_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudiante_Materia" ADD CONSTRAINT "Estudiante_Materia_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_estudianteId_materiaId_fkey" FOREIGN KEY ("estudianteId", "materiaId") REFERENCES "Estudiante_Materia"("usuarioId", "materiaId") ON DELETE CASCADE ON UPDATE CASCADE;
