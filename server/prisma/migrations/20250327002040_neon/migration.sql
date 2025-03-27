-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "empresaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empresas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidades" (
    "id" TEXT NOT NULL,
    "codUnidade" TEXT NOT NULL,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "unidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicos" (
    "id" TEXT NOT NULL,
    "codServico" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "descricaoProposta" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "servicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "propostas" (
    "id" TEXT NOT NULL,
    "codProposta" TEXT NOT NULL,
    "idUnidade" TEXT NOT NULL,
    "idCliente" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "idContrato" TEXT NOT NULL,
    "funcionarios" DOUBLE PRECISION NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "deslocamento" BOOLEAN NOT NULL DEFAULT false,
    "valorDeslocamento" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "propostas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proposta_servicos" (
    "id" TEXT NOT NULL,
    "idProposta" TEXT NOT NULL,
    "idServico" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "proposta_servicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contratos" (
    "id" TEXT NOT NULL,
    "codContrato" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "idOrdem" TEXT,
    "dataFinal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contratos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordens" (
    "id" TEXT NOT NULL,
    "codOrdem" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "idUnidade" TEXT NOT NULL,
    "idCliente" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "funcionarios" DOUBLE PRECISION NOT NULL,
    "deslocamento" BOOLEAN NOT NULL DEFAULT false,
    "valorDeslocamento" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataInicial" TIMESTAMP(3),
    "dataFinal" TIMESTAMP(3),

    CONSTRAINT "ordens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordem_servicos" (
    "id" TEXT NOT NULL,
    "idServico" TEXT NOT NULL,
    "idOrdem" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ordem_servicos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_username_key" ON "usuarios"("username");

-- CreateIndex
CREATE INDEX "usuarios_username_password_idx" ON "usuarios"("username", "password");

-- CreateIndex
CREATE UNIQUE INDEX "unidades_codUnidade_key" ON "unidades"("codUnidade");

-- CreateIndex
CREATE INDEX "unidades_id_codUnidade_idx" ON "unidades"("id", "codUnidade");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_codCliente_key" ON "clientes"("codCliente");

-- CreateIndex
CREATE INDEX "clientes_id_codCliente_idx" ON "clientes"("id", "codCliente");

-- AddForeignKey
ALTER TABLE "propostas" ADD CONSTRAINT "propostas_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propostas" ADD CONSTRAINT "propostas_idUnidade_fkey" FOREIGN KEY ("idUnidade") REFERENCES "unidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propostas" ADD CONSTRAINT "propostas_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propostas" ADD CONSTRAINT "propostas_idContrato_fkey" FOREIGN KEY ("idContrato") REFERENCES "contratos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposta_servicos" ADD CONSTRAINT "proposta_servicos_idProposta_fkey" FOREIGN KEY ("idProposta") REFERENCES "propostas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposta_servicos" ADD CONSTRAINT "proposta_servicos_idServico_fkey" FOREIGN KEY ("idServico") REFERENCES "servicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contratos" ADD CONSTRAINT "contratos_idOrdem_fkey" FOREIGN KEY ("idOrdem") REFERENCES "ordens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens" ADD CONSTRAINT "ordens_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens" ADD CONSTRAINT "ordens_idUnidade_fkey" FOREIGN KEY ("idUnidade") REFERENCES "unidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens" ADD CONSTRAINT "ordens_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordem_servicos" ADD CONSTRAINT "ordem_servicos_idServico_fkey" FOREIGN KEY ("idServico") REFERENCES "servicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordem_servicos" ADD CONSTRAINT "ordem_servicos_idOrdem_fkey" FOREIGN KEY ("idOrdem") REFERENCES "ordens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
