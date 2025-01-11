-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clientes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codCliente" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "nomeFantasia" TEXT NOT NULL,
    "representante" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "funcionarios" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_clientes" ("bairro", "celular", "cep", "cidade", "cnpj", "codCliente", "complemento", "cpf", "createdAt", "email", "estado", "id", "nomeFantasia", "numero", "pais", "razaoSocial", "representante", "rg", "rua", "telefone") SELECT "bairro", "celular", "cep", "cidade", "cnpj", "codCliente", "complemento", "cpf", "createdAt", "email", "estado", "id", "nomeFantasia", "numero", "pais", "razaoSocial", "representante", "rg", "rua", "telefone" FROM "clientes";
DROP TABLE "clientes";
ALTER TABLE "new_clientes" RENAME TO "clientes";
CREATE UNIQUE INDEX "clientes_codCliente_key" ON "clientes"("codCliente");
CREATE INDEX "clientes_id_codCliente_idx" ON "clientes"("id", "codCliente");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
