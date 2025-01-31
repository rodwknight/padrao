/*
  Warnings:

  - You are about to drop the column `ordemId` on the `ordem_servicos` table. All the data in the column will be lost.
  - Added the required column `idOrdem` to the `ordem_servicos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ordem_servicos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idServico" TEXT NOT NULL,
    "idOrdem" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ordem_servicos_idServico_fkey" FOREIGN KEY ("idServico") REFERENCES "servicos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ordem_servicos_idOrdem_fkey" FOREIGN KEY ("idOrdem") REFERENCES "ordens" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ordem_servicos" ("createdAt", "id", "idServico", "valor") SELECT "createdAt", "id", "idServico", "valor" FROM "ordem_servicos";
DROP TABLE "ordem_servicos";
ALTER TABLE "new_ordem_servicos" RENAME TO "ordem_servicos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
