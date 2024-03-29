import { Request, Response } from "express";
import { DeleteHotelCase } from "../../Application/UseCase/DeleteHotelCase";

export class DeleteHotelController{
    constructor(readonly deleteHotelCase: DeleteHotelCase){}
    async execute(req:Request, res:Response): Promise<void> {
        const { uuid } = req.params;
        try {
            await this.deleteHotelCase.execute(uuid);
            res.status(200).send({
              status: "success",
              data: "Hotel successfully deleted",
            });
          } catch (error) {
            res.status(204).send({
              status: "error",
              data: "Ha ocurrido un error durante su petición.",
              msg: error,
            });
          }
    }
    
}