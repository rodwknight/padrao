/*
  Warnings:

  - You are about to drop the column `status` on the `propostas_servicos` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_propostas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codProposta" TEXT NOT NULL,
    "idUnidade" TEXT NOT NULL,
    "idCliente" TEXT NOT NULL,
    "funcionarios" REAL NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "deslocamento" BOOLEAN NOT NULL DEFAULT false,
    "valorDeslocamento" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_propostas" ("codProposta", "createdAt", "funcionarios", "id", "idCliente", "idUnidade") SELECT "codProposta", "createdAt", "funcionarios", "id", "idCliente", "idUnidade" FROM "propostas";
DROP TABLE "propostas";
ALTER TABLE "new_propostas" RENAME TO "propostas";
CREATE TABLE "new_propostas_servicos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idProposta" TEXT NOT NULL,
    "idServico" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_propostas_servicos" ("createdAt", "id", "idProposta", "idServico", "valor") SELECT "createdAt", "id", "idProposta", "idServico", "valor" FROM "propostas_servicos";
DROP TABLE "propostas_servicos";
ALTER TABLE "new_propostas_servicos" RENAME TO "propostas_servicos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
