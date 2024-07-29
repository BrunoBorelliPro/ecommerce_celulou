import { describe, expect, test } from "vitest";
import { Cliente } from "./Cliente";

describe("Testing the entity Cliente", () => {

    test("Should be able to create a Cliente object", () => {
        expect(new Cliente({
            codigoCliente: "C1s563245874",
            nomeCliente: "Victor",
            cpfCliente: "12312312321",
            celularCliente: "11965636563",
            emailCliente: "victor@gmail.com",
            createdAt: new Date(Date.now()),
        })).satisfies;

    })

    test("Should not be able to create a Client object", () => {
        // Testando codigoCliente
        // Tentando criar um objeto de cliente com codigoCliente vazio
        expect(() => {
            new Cliente({
                codigoCliente: "",
                nomeCliente: "Victor",
                cpfCliente: "39302302932",
                celularCliente: "11965636563",
                emailCliente: "victor@gmail.com",
                createdAt: new Date(Date.now()),
            });
        }).toThrow("O tamanho do código precisa ser de 12 caracteres")

        // Tentando criar um objeto de cliente com codigoCliente sem ser string 
        expect(() => {
            new Cliente({
                codigoCliente: null,
                nomeCliente: "Victor",
                cpfCliente: "39302302932",
                celularCliente: "11965636563",
                emailCliente: "victor@gmail.com",
                createdAt: new Date(Date.now()),
            });
        }).toThrow("O código precisa ser uma string");

        // Tentando criar um objeto de cliente com codigoCliente começando com uma letra diferente de C
        expect(() => {
            new Cliente({
                codigoCliente: "abcdefghijkl",
                nomeCliente: "Victor",
                cpfCliente: "12312312321",
                celularCliente: "11965636563",
                emailCliente: "victor@gmail.com",
                createdAt: new Date(Date.now()),
            });
        }).toThrow("O código de cliente precisa começar com C");

        // Tentando criar um cliente com um código de tamanho diferente de 12
        expect(() => {
            new Cliente({
                codigoCliente: "Cbcdefghijklm",
                nomeCliente: "Victor",
                cpfCliente: "12312312321",
                celularCliente: "11965636563",
                emailCliente: "victor@gmail.com",
                createdAt: new Date(Date.now()),
            });
        }).toThrow("O tamanho do código precisa ser de 12 caracteres");

        // Testando nomeCliente
        // Tentando criar um objeto de cliente com nomeCliente nulo
        expect(() => {
            new Cliente({
                codigoCliente: "C12345678911",
                nomeCliente: "",
                cpfCliente: "39302302932",
                celularCliente: "11965636563",
                emailCliente: "victor@gmail.com",
                createdAt: new Date(Date.now()),
            });
        }).toThrow("É necessário inserir um nome");

        // Tentando criar um objeto de cliente com nomeCliente diferente de string
        expect(() => {
            new Cliente({
                codigoCliente: "C12345678911",
                nomeCliente: null,
                cpfCliente: "39302302932",
                celularCliente: "11965636563",
                emailCliente: "victor@gmail.com",
                createdAt: new Date(Date.now()),
            })
        }).toThrow("O nome precisa ser uma string");

        // Tentando criar um objeto de cliente com nomeCliente com mais de 60 caracteres
        expect(() => {
            new Cliente({
                codigoCliente: "C12345678911",
                nomeCliente: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",
                cpfCliente: "39302302932",
                celularCliente: "11965636563",
                emailCliente: "victor@gmail.com",
                createdAt: new Date(Date.now()),
            })
        }).toThrow("O nome não pode ter mais do que 60 caracteres")

        // Testando cpfCliente
        // Testando cpfCliente nulo
        expect(() => {
            new Cliente({
                codigoCliente: "Cabchfjdkier",
                nomeCliente: "Victor",
                cpfCliente: "",
                celularCliente: "11965636563",
                emailCliente: "victor@gmail.com",
                createdAt: new Date(Date.now()),
            })
        }).toThrow("O CPF deve ter 11 dígitos");

        // Testando cpfCliente com um tipo diferente de string
        expect(() => {
            new Cliente({
                codigoCliente: "Cabchfjdkier",
                nomeCliente: "Victor",
                cpfCliente: null,
                celularCliente: "11965636563",
                emailCliente: "victor@gmail.com",
                createdAt: new Date(Date.now()),
            })
        }).toThrow("O CPF precisa ser uma string");

        // Testando celularCliente
        // Testando um número de celular com menos de 10 caracteres
        expect(() => {
            new Cliente({
                codigoCliente: "Cabchfjdkier",
                nomeCliente: "Victor",
                cpfCliente: "39302302932",
                celularCliente: "965636563",
                emailCliente: "victor@gmail.com",
                createdAt: new Date(Date.now()),
            })
        }).toThrow("O tamanho mínimo para número de celular deve ser de 10 caracteres");

        // Testando um número de celular com mais de 12 caracteres
        expect(() => {
            new Cliente({
                codigoCliente: "Cabchfjdkier",
                nomeCliente: "Victor",
                cpfCliente: "39302302932",
                celularCliente: "0011965636563",
                emailCliente: "victor@gmail.com",
                createdAt: new Date(Date.now()),
            })
        }).toThrow("O tamanho máximo para número de celular deve ser de 12 caracteres");

        // Testando um celularCliente com um tipo diferente de string
        expect(() => {
            new Cliente({
                codigoCliente: "Cabchfjdkier",
                nomeCliente: "Victor",
                cpfCliente: "39302302932",
                celularCliente: null,
                emailCliente: "victor@gmail.com",
                createdAt: new Date(Date.now()),
            })
        }).toThrow("O número de celular deve ser uma string");
    
        // Testando e-mail
        // Testando com um endereço de email inválido  
        expect(() => {
            new Cliente({
                codigoCliente: "Cabchfjdkier",
                nomeCliente: "Victor",
                cpfCliente: "39302302932",
                celularCliente: "11953654555",
                emailCliente: "victor@a",
                createdAt: new Date(Date.now()),
            })
        }).toThrow("Endereço de e-mail inválido!");

        // Tesntando com um endereço de email nulo
        expect(() => {
            new Cliente({
                codigoCliente: "Cabchfjdkier",
                nomeCliente: "Victor",
                cpfCliente: "39302302932",
                celularCliente: "11953654555",
                emailCliente: "",
                createdAt: new Date(Date.now()),
            })
        }).toThrow("Endereço de e-mail inválido!");

        // Testando com um endereço de email de um tipo diferente de string
        expect(() => {
            new Cliente({
                codigoCliente: "Cabchfjdkier",
                nomeCliente: "Victor",
                cpfCliente: "39302302932",
                celularCliente: "11953654555",
                emailCliente: null,
                createdAt: new Date(Date.now()),
            })
        }).toThrow("O e-mail deve ser uma string");
    })
})