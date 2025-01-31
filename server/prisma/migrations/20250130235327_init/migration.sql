-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contratos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codContrato" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "idOrdem" TEXT,
    "dataFinal" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "contratos_idOrdem_fkey" FOREIGN KEY ("idOrdem") REFERENCES "ordens" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_contratos" ("codContrato", "createdAt", "dataFinal", "id", "idOrdem", "status") SELECT "codContrato", "createdAt", "dataFinal", "id", "idOrdem", "status" FROM "contratos";
DROP TABLE "contratos";
ALTER TABLE "new_contratos" RENAME TO "contratos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
