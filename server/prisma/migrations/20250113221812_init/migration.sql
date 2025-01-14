/*
  Warnings:

  - You are about to drop the `propostas_servicos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "propostas_servicos";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "proposta_servicos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idProposta" TEXT NOT NULL,
    "idServico" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "proposta_servicos_idProposta_fkey" FOREIGN KEY ("idProposta") REFERENCES "propostas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "proposta_servicos_idServico_fkey" FOREIGN KEY ("idServico") REFERENCES "servicos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "propostas_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "propostas_idUnidade_fkey" FOREIGN KEY ("idUnidade") REFERENCES "unidades" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_propostas" ("codProposta", "createdAt", "deslocamento", "funcionarios", "id", "idCliente", "idUnidade", "status", "valorDeslocamento") SELECT "codProposta", "createdAt", "deslocamento", "funcionarios", "id", "idCliente", "idUnidade", "status", "valorDeslocamento" FROM "propostas";
DROP TABLE "propostas";
ALTER TABLE "new_propostas" RENAME TO "propostas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
