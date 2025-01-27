-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contratos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codContrato" TEXT NOT NULL,
    "idProposta" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "dataFinal" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "contratos_idProposta_fkey" FOREIGN KEY ("idProposta") REFERENCES "propostas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_contratos" ("codContrato", "createdAt", "id", "idProposta", "status") SELECT "codContrato", "createdAt", "id", "idProposta", "status" FROM "contratos";
DROP TABLE "contratos";
ALTER TABLE "new_contratos" RENAME TO "contratos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
