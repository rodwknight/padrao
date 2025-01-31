/*
  Warnings:

  - Added the required column `codOrdem` to the `ordens` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ordens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codOrdem" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "idUnidade" TEXT NOT NULL,
    "idCliente" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "funcionarios" REAL NOT NULL,
    "deslocamento" BOOLEAN NOT NULL DEFAULT false,
    "valorDeslocamento" REAL NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ordens_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ordens_idUnidade_fkey" FOREIGN KEY ("idUnidade") REFERENCES "unidades" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ordens_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ordens" ("createdAt", "deslocamento", "funcionarios", "id", "idCliente", "idUnidade", "idUsuario", "status", "total", "valorDeslocamento") SELECT "createdAt", "deslocamento", "funcionarios", "id", "idCliente", "idUnidade", "idUsuario", "status", "total", "valorDeslocamento" FROM "ordens";
DROP TABLE "ordens";
ALTER TABLE "new_ordens" RENAME TO "ordens";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
