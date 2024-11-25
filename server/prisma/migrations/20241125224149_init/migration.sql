/*
  Warnings:

  - Added the required column `codServico` to the `servicos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_servicos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codServico" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "descricaoOrcamento" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_servicos" ("createdAt", "descricao", "descricaoOrcamento", "id", "nome", "valor") SELECT "createdAt", "descricao", "descricaoOrcamento", "id", "nome", "valor" FROM "servicos";
DROP TABLE "servicos";
ALTER TABLE "new_servicos" RENAME TO "servicos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
