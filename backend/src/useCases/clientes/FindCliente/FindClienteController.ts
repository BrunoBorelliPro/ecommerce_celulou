import { NextFunction, Request, Response } from "express";
import { FindClienteUC } from "./FindClienteUC";

export class FindClienteController {
    constructor(
        private findClienteUC: FindClienteUC,
    ) {}
    
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { codigo } = request.params;
        try {

            let result = await this.findClienteUC.execute({
                codigoCliente: codigo
            });

            if (result) {
                return response.status(200).json({ result: result })
            }

            return response.status(404).json({ error: "Cliente não encontrado"})
        } catch (error) {
            next(error);
        }
    }
}