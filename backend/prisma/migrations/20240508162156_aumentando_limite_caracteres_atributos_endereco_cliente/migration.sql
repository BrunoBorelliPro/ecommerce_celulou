-- AlterTable
ALTER TABLE "Cliente" ALTER COLUMN "nomeCliente" SET DATA TYPE VARCHAR(60);

-- AlterTable
ALTER TABLE "Endereco" ALTER COLUMN "nomeRua" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "complemento" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "bairro" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "cidade" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "estado" SET DATA TYPE VARCHAR(60);