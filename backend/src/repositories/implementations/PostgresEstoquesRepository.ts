import { PrismaClient } from "@prisma/client";
import { Estoque } from "../../entities/Estoque";
import { IEstoquesRepository } from "../IEstoquesRepository";

export class PostgresEstoquesRepository implements IEstoquesRepository {
    private prisma = new PrismaClient();

    async save(estoque: Estoque): Promise<void> {
        await this.prisma.estoque.create({
            data: estoque
        })
    }

    async getByCodigo(codigoEstoque: string): Promise<Estoque> {
        const estoque: Estoque = await this.prisma.estoque.findUnique({
            where: {
                codigoEstoque: codigoEstoque
            }
        });
        
        return estoque;
    }

    async getByProduto(codigoProduto: string): Promise<Estoque> {
        const estoque: Estoque = await this.prisma.estoque.findUnique({
            where: {
                codigoProduto: codigoProduto
            }
        });

        return estoque;
    }
}