import { Request, Response } from "express";
import { CreateReservationUseCase } from "../../Application/UseCase/CreateReservationUseCase";
import { Reservation } from "../../Domain/Entities/Reservation";
import { PaymentMethod } from "../../Domain/Entities/PaymentMethod";
import PaymentMethodService from "../../Domain/services/PaymentMethodService";

export class CreateReservationController {
    constructor(readonly createReservationUseCase: CreateReservationUseCase, readonly paymentMethodService: PaymentMethodService) { }

    async execute(req: Request, res: Response) {
        const data = req.body;
        let payment = new PaymentMethod(parseFloat(data.amount), data.currency, data.paymentType);
        let dateStats = data.date_start.split("-");
        let dataEnds = data.date_end.split("-");
        let dataEndObj = new Date(+dataEnds[2], +dataEnds[1] - 1, +dataEnds[0]);
        let dataStartObj = new Date(+dateStats[2], +dateStats[1] - 1, +dateStats[0]);
        let reservationData = new Reservation(data.user_uuid, data.hotel_uuid, parseInt(data.room_number), data.description, dataStartObj, dataEndObj, payment);
        console.log(reservationData);
        try {
            if(await this.paymentMethodService.pay(payment)){
                const reservation = await this.createReservationUseCase.execute(reservationData);
                if (reservation) {
                    res.status(200).send({
                        status: "success",
                        data: {
                            uuid: reservation.uuid,
                            hotel_uuid: reservation.getHotelUUID(),
                            user_uuid: reservation.getUserUUID(),
                            room_number: reservation.getRoomNumber(),
                            description: reservation.getDescription(),
                            date_start: reservation.getDateStart(),
                            date_end: reservation.getDateEnd(),
                            payment: reservation.getPayment(),
                        },
                    });
                } else {
                    res.status(500).send({
                        status: "internal server error",
                        data: "Ha ocurrido un error con tu peticion, inténtelo más tarde.",
                    });
                }
            }else{
                res.status(500).send({
                    status: "internal server error",
                    data: "Ha ocurrido un error con tu peticion, en cuanto al pago, inténtelo más tarde.",
                });
            }
        } catch (error) {
            res.status(204).send({
                status: "error",
                data: "Ha ocurrido un error durante su petición.",
                msg: error,
            });
        }
    }
}