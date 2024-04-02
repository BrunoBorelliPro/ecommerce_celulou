import { Cliente } from "../../../entities/Cliente";
import { AppError } from "../../../errors/AppError";
import { IClientesRepository } from "../../../repositories/IClientesRepository";
import { ICreateClienteRequestDTO, ICreateClienteResponseDTO } from "./CreateClienteDTO";
import uniqid from "uniqid";
import { cpf } from "cpf-cnpj-validator";
import { ZodError } from "zod";
import { encriptarSenhaUC } from "../../autenticacao/EncriptarSenha";

export class CreateClienteUC {
    constructor(
        private clientesRepository: IClientesRepository
    ) { }

    async execute(data: ICreateClienteRequestDTO): Promise<ICreateClienteResponseDTO> {
        try {
            let { nomeCliente, cpfCliente, celularCliente, emailCliente, senha } = data;
            cpfCliente = cpfCliente.replace(/[.-]/g, '');
            if (!cpf.isValid(cpfCliente)) {
                throw new AppError("O CPF é Inválido", 400);
            }

            if (senha.length < 8) {
                throw new AppError("A senha deve conter pelo menos 8 caracteres", 400);
            }

            let codigoCliente, codigoExists = null;

            do {
                codigoCliente = "C" + uniqid().slice(-11);

                codigoExists = await this.clientesRepository.getByCodigoCliente(codigoCliente);

            } while (codigoExists != null);

            const createdAt = new Date(Date.now());
            const isAdmin = false;

            const hash = (await encriptarSenhaUC.execute({senha})).hash;

            const cliente = new Cliente({ codigoCliente, nomeCliente, cpfCliente, celularCliente, emailCliente, senha: hash, createdAt, isAdmin });

            let clienteExists = await this.clientesRepository.getByCpfCliente(cpfCliente);

            if (clienteExists) {
                throw new AppError("O CPF já está cadastrado", 400);
            }

            clienteExists = await this.clientesRepository.getByEmailCliente(emailCliente);

            if (clienteExists) {
                throw new AppError("O e-mail já está cadastrado", 400);
            }

            // Adiciona a senha com encriptação  

            await this.clientesRepository.save(cliente);

            return { message: "Cliente cadastrado com sucesso!" }

        } catch (error) {
            if (error instanceof ZodError) {
                throw new AppError(error.errors[0].message, 400);
            }

            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }


}