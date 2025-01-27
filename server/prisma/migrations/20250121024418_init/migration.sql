-- CreateTable
CREATE TABLE "contratos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codContrato" TEXT NOT NULL,
    "idProposta" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "contratos_idProposta_fkey" FOREIGN KEY ("idProposta") REFERENCES "propostas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
