import { z } from "zod";

export class Cliente {
    public codigoCliente: string;
    public cpfCliente: string;
    public nomeCliente: string;
    public celularCliente: string;
    public emailCliente: string;
    public createdAt: Date;
    private static clienteSchema = z.object({
        codigoCliente: z.string({
            required_error: "É necessário inserir um código",
            invalid_type_error: "O código precisa ser uma string"
        }).startsWith("C", {message: "O código de cliente precisa começar com C"}).length(12, {message: "O tamanho do código precisa ser de 12 caracteres"}),
        nomeCliente: z.string({
            required_error: "É necessário inserir um nome",
            invalid_type_error: "O nome precisa ser uma string"
        }).min(1, {message: "É necessário inserir um nome"}).max(60, { message: "O nome não pode ter mais do que 60 caracteres" }),
        cpfCliente: z.string({
            required_error: "É necessário inserir um CPF",
            invalid_type_error: "O CPF precisa ser uma string"
        }).length(11, { message: "O CPF deve ter 11 dígitos" }),
        celularCliente: z.string({
            invalid_type_error: "O número de celular deve ser uma string"
        }).min(10, {message: "O tamanho mínimo para número de celular deve ser de 10 caracteres"}).max(12, { message: "O tamanho máximo para número de celular deve ser de 12 caracteres" }),
        emailCliente: z.string({
            required_error: "É necessário inserir um e-mail",
            invalid_type_error: "O e-mail deve ser uma string"
        }).email({ message: "Endereço de e-mail inválido!" }),
    })
    
    constructor(props: Cliente) {
        Cliente.clienteSchema.parse(props);
        Object.assign(this, props);
    }
}