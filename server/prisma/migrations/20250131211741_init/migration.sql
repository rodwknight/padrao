-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ordem_servicos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idServico" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ordemId" TEXT,
    CONSTRAINT "ordem_servicos_idServico_fkey" FOREIGN KEY ("idServico") REFERENCES "servicos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ordem_servicos_ordemId_fkey" FOREIGN KEY ("ordemId") REFERENCES "ordens" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ordem_servicos" ("createdAt", "id", "idServico", "valor") SELECT "createdAt", "id", "idServico", "valor" FROM "ordem_servicos";
DROP TABLE "ordem_servicos";
ALTER TABLE "new_ordem_servicos" RENAME TO "ordem_servicos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
