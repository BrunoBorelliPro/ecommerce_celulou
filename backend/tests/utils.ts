import { PrismaClient } from "@prisma/client";
import { cpf } from "cpf-cnpj-validator";
import { CreateClienteUC } from "../src/useCases/clientes/CreateCliente/CreateClienteUC";
import { postgresClientesRepository } from "../src/repositories/implementations";

async function resetDatabase(prisma: PrismaClient) {
    await prisma.$transaction([
        prisma.alteracoesEstoque.deleteMany(),
        prisma.avaliacao.deleteMany(),
        prisma.categoria.deleteMany(),
        prisma.cliente.deleteMany(),
        prisma.clienteHasProdutoFavorito.deleteMany(),
        prisma.endereco.deleteMany(),
        prisma.estoque.deleteMany(),
        prisma.pedido.deleteMany(),
        prisma.pedidoHasProduto.deleteMany(),
        prisma.produto.deleteMany(),
        prisma.produtoHasCategoria.deleteMany(),
    ]);
}

function getClientJson() {
    return {
        codigoCliente: 1,
        nomeCliente: "Victor Oliveira",
        cpfCliente: cpf.generate(),
        celularCliente: "11956365632",
        emailCliente: "email@email.com"
    }
}

async function getCliente(){
    const {codigoCliente} = await new CreateClienteUC(postgresClientesRepository)
    .execute(getClientJson())
    const cliente = await postgresClientesRepository.getByCodigoCliente(codigoCliente)
    return cliente

}

export { resetDatabase, getClientJson, getCliente }