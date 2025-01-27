/*
  Warnings:

  - You are about to drop the column `dataEncerramento` on the `propostas` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_propostas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codProposta" TEXT NOT NULL,
    "idUnidade" TEXT NOT NULL,
    "idCliente" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "funcionarios" REAL NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "deslocamento" BOOLEAN NOT NULL DEFAULT false,
    "valorDeslocamento" REAL NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "propostas_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "propostas_idUnidade_fkey" FOREIGN KEY ("idUnidade") REFERENCES "unidades" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "propostas_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_propostas" ("codProposta", "createdAt", "deslocamento", "funcionarios", "id", "idCliente", "idUnidade", "idUsuario", "status", "total", "valorDeslocamento") SELECT "codProposta", "createdAt", "deslocamento", "funcionarios", "id", "idCliente", "idUnidade", "idUsuario", "status", "total", "valorDeslocamento" FROM "propostas";
DROP TABLE "propostas";
ALTER TABLE "new_propostas" RENAME TO "propostas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
