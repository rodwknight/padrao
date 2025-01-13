-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_propostas_servicos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idProposta" TEXT NOT NULL,
    "idServico" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_propostas_servicos" ("createdAt", "id", "idProposta", "idServico", "valor") SELECT "createdAt", "id", "idProposta", "idServico", "valor" FROM "propostas_servicos";
DROP TABLE "propostas_servicos";
ALTER TABLE "new_propostas_servicos" RENAME TO "propostas_servicos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
