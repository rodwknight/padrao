/*
  Warnings:

  - Added the required column `idLicenca` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idEmpresa` to the `unidades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "empresas" ADD COLUMN     "idLicenca" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "unidades" ADD COLUMN     "idEmpresa" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "licencas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "licencas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "empresas" ADD CONSTRAINT "empresas_idLicenca_fkey" FOREIGN KEY ("idLicenca") REFERENCES "licencas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unidades" ADD CONSTRAINT "unidades_idEmpresa_fkey" FOREIGN KEY ("idEmpresa") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
