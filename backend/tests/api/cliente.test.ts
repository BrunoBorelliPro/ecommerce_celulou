import { afterAll, beforeAll, describe, expect, it, test, afterEach, beforeEach  } from "vitest";
import {app} from "../../src/index";
import request from "supertest";
import prisma from "../../src/repositories/implementations/prisma";
import { execSync } from "child_process";
import { resetDatabase, getCliente, getClientJson } from "../utils";
import { cpf } from "cpf-cnpj-validator";


beforeAll(async () => {
    execSync("npx prisma migrate reset --force")
})

afterAll(async () => {
    await resetDatabase(prisma)
})


describe("POST /clientes", () => {
    beforeEach(async () => {
        await resetDatabase(prisma)
    });
    
    it("should create a new client", async () => {
        const clientJson = getClientJson()

        const {status, body} = await  request(app).post("/clientes").send(clientJson)
        expect(status).toBe(201);
        expect(body).haveOwnProperty("message")  
        expect(body.message).toBe("Cliente cadastrado com sucesso!")

        
    });

    it("should't create a new client with invalid cpf", async () => {
        const clientJson = getClientJson()

        clientJson.cpfCliente = "248.927.760-0"

        const {status, body} = await  request(app).post("/clientes").send(clientJson)

        expect(status).toBe(400);
        expect(body).haveOwnProperty("error")
        expect(body.error).toBe("O CPF é Inválido")
    });

    it("should't create a new client with invalid email", async () => {
        const clientJson = getClientJson()

        clientJson.emailCliente = "email"

        const {status, body} = await  request(app).post("/clientes").send(clientJson)

        expect(status).toBe(400);
        expect(body).haveOwnProperty("error")
        expect(body.error).toBe("Endereço de e-mail inválido!")
    });

    it("should't create a new client if cpf already exists", async () => {
        const clientJson = getClientJson()

        await  request(app).post("/clientes").send(clientJson)

        const {status, body} = await  request(app).post("/clientes").send(clientJson)

        expect(status).toBe(400);
        expect(body).haveOwnProperty("error")
        expect(body.error).toBe("O CPF já está cadastrado")

    });


    it("should't create a new client if email already exists", async () => {
        const clientJson = getClientJson()

        await  request(app).post("/clientes").send(clientJson)

        clientJson.cpfCliente = cpf.generate()

        const {status, body} = await  request(app).post("/clientes").send(clientJson)

        expect(status).toBe(400);
        expect(body).haveOwnProperty("error")
        expect(body.error).toBe("O e-mail já está cadastrado")

    });
    

    it("should't create a new client cpfCliente is missing", async () => {
        const clientJson = getClientJson()

        delete clientJson.cpfCliente

        const {status, body}  = await request(app).post("/clientes").send(clientJson)

        expect(status).toBe(400);
        expect(body).haveOwnProperty("error")
        expect(body.error).toBe("É necessário inserir um cpf!")
    })

    it("should't create a new client nomeCliente is missing", async () => {
        const clientJson = getClientJson()

        delete clientJson.nomeCliente

        const {status, body}  = await request(app).post("/clientes").send(clientJson)

        expect(status).toBe(400);
        expect(body).haveOwnProperty("error")
        expect(body.error).toBe("É necessário inserir um nome")
    })


    it("should't create a new client celularCliente is missing", async () => {
        const clientJson = getClientJson()

        delete clientJson.celularCliente

        const {status, body}  = await request(app).post("/clientes").send(clientJson)

        expect(status).toBe(400);

        expect(body).haveOwnProperty("error")

        console.log(body.error)

        expect(body.error).toBe("Required")
    }
        
        )

    it("should't create a new client emailCliente is missing", async () => {
        const clientJson = getClientJson()

        delete clientJson.emailCliente

        const {status, body}  = await request(app).post("/clientes").send(clientJson)

        expect(status).toBe(400);
        expect(body).haveOwnProperty("error")
        expect(body.error).toBe("É necessário inserir um e-mail")
    })
});

describe("GET /clientes/{codigo}", () => {
    beforeEach(async () => {
        await resetDatabase(prisma)
    });

    it("should't return a client", async () => {
        const {status, body} = await request(app).get("/clientes/1")

        expect(status).toBe(404)
        expect(body).haveOwnProperty("error")
        expect(body.error).toBe("Cliente não encontrado")
    })
        

    it("should return a client", async () => {
        const cliente = await getCliente()
        console.log(cliente)

        const {status: status2, body: body2} = await request(app).get(`/clientes/${cliente.codigoCliente}`)

        expect(status2).toBe(200)
        expect(body2).haveOwnProperty("result")
        const result = body2.result
        expect(result.nomeCliente).toBe(cliente.nomeCliente)
        expect(result.cpfCliente).toBe(cliente.cpfCliente.replace(/\D/g, ''))
        expect(result.celularCliente).toBe(cliente.celularCliente)
        expect(result.emailCliente).toBe(cliente.emailCliente)
        expect(result.codigoCliente).toBe(cliente.codigoCliente)
        expect(result).haveOwnProperty("createdAt")

    })
})