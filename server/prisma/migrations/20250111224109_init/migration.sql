-- CreateTable
CREATE TABLE "propostas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codProposta" TEXT NOT NULL,
    "idUnidade" TEXT NOT NULL,
    "idCliente" TEXT NOT NULL,
    "funcionarios" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "propostas_servicos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idProposta" TEXT NOT NULL,
    "idServico" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
