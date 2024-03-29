import { Request, Response } from "express";
import { Hotel } from "../../Domain/Entities/Hotel";
import { CreateHotelCase } from "../../Application/UseCase/CreateHotelCase";

export class CreateHotelController{
    constructor(readonly createHotelCase: CreateHotelCase){}

    async execute(req: Request, res: Response){
        const data = req.body;
        let hotel_Data = new Hotel(data.name, data.address, data.description);
        try{
            let hotel = await this.createHotelCase.execute(hotel_Data);
            if(hotel){
                res.status(200).send({
                    status: "success",
                    data: {
                        id: hotel.uuid,
                        name: hotel.getName(),
                        address: hotel.getAddress(),
                        description: hotel.getDescription(),
                        rating: hotel.getRating()
                    }
                });
            }else{
                res.status(500).send({
                    status: "internal server error",
                    data: "Ha ocurrido un error con tu peticion, inténtelo más tarde."
                });
            }
         } catch(error){
            res.status(204).send({
                status: "error",
                data: "Ha ocurrido un error durante su petición.",
                msg: error,
            });
        }
    
    }
}