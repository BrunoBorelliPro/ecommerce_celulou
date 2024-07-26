import { AppError } from "../../../errors/AppError";
import { IEstoquesRepository } from "../../../repositories/IEstoquesRepository";
import { CreateAlteracaoEstoqueUC } from "../../alteracao_estoque/CreateAlteracaoEstoque/CreateAlteracaoEstoqueUC";
import { IAlterarEstoqueRequestDTO, IAlterarEstoqueResponseDTO } from "./AlterarEstoqueDTO";

export class AlterarEstoqueUC {
    constructor(
        private estoquesRepository: IEstoquesRepository,
        private createAlteracaoEstoque: CreateAlteracaoEstoqueUC,
    ) { }

    async execute(data: IAlterarEstoqueRequestDTO): Promise<IAlterarEstoqueResponseDTO> {
        const { codigoProduto, valorAlteracao } = data;

        const estoqueExists = await this.estoquesRepository.getByProduto(codigoProduto);

        if (!estoqueExists) {
            throw new AppError("Estoque não encontrado!", 404);
        }

        if (estoqueExists.quantidade + valorAlteracao < 0) {
            throw new AppError("Estoque insuficiente!", 400);
        }

        const quantidadeAtual = estoqueExists.quantidade;
        const codigoEstoque = estoqueExists.codigoEstoque;

        try {

            const quantidadeNova = quantidadeAtual + valorAlteracao;

            await this.estoquesRepository.alterarEstoque(codigoEstoque, quantidadeNova)
            

            await this.createAlteracaoEstoque.execute({ valorAlteracao: valorAlteracao, codigoEstoque: codigoEstoque });

            return {
                message: "Estoque alterado com sucesso!",
                codigoEstoque: codigoEstoque,
                codigoProduto: estoqueExists.codigoProduto,
                quantidade: quantidadeNova,
            }

        } catch (error) {
            const estoque = await this.estoquesRepository.getByCodigo(codigoEstoque);

            if (estoque.quantidade !== quantidadeAtual) {
                await this.estoquesRepository.alterarEstoque(codigoEstoque, quantidadeAtual);
            }
            throw error;
        }

    }
}