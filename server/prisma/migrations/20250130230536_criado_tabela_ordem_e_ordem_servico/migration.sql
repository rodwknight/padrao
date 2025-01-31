/*
  Warnings:

  - Added the required column `idOrdem` to the `contratos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ordens" (
    "id" TEXT NOT NULL PRIMARY KEY,
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

-- CreateTable
CREATE TABLE "ordem_servicos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idServico" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ordem_servicos_idServico_fkey" FOREIGN KEY ("idServico") REFERENCES "servicos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contratos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codContrato" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "idOrdem" TEXT NOT NULL,
    "dataFinal" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "contratos_idOrdem_fkey" FOREIGN KEY ("idOrdem") REFERENCES "ordens" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_contratos" ("codContrato", "createdAt", "dataFinal", "id", "status") SELECT "codContrato", "createdAt", "dataFinal", "id", "status" FROM "contratos";
DROP TABLE "contratos";
ALTER TABLE "new_contratos" RENAME TO "contratos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
