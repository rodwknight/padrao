/*
  Warnings:

  - You are about to drop the column `codEmpresa` on the `unidades` table. All the data in the column will be lost.
  - Added the required column `codUnidade` to the `unidades` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_unidades" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codUnidade" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "nomeFantasia" TEXT NOT NULL,
    "representante" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_unidades" ("bairro", "celular", "cep", "cidade", "cnpj", "complemento", "cpf", "createdAt", "email", "estado", "id", "nomeFantasia", "numero", "pais", "razaoSocial", "representante", "rg", "rua", "telefone") SELECT "bairro", "celular", "cep", "cidade", "cnpj", "complemento", "cpf", "createdAt", "email", "estado", "id", "nomeFantasia", "numero", "pais", "razaoSocial", "representante", "rg", "rua", "telefone" FROM "unidades";
DROP TABLE "unidades";
ALTER TABLE "new_unidades" RENAME TO "unidades";
CREATE UNIQUE INDEX "unidades_codUnidade_key" ON "unidades"("codUnidade");
CREATE INDEX "unidades_id_codUnidade_idx" ON "unidades"("id", "codUnidade");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
