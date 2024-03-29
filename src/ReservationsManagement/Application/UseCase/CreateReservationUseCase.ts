import { Reservation } from "../../Domain/Entities/Reservation";
import { ReservationInterface } from "../../Domain/Port/ReservationInterface";

export class CreateReservationUseCase {
    constructor(readonly reservationInterface: ReservationInterface) {}

    async execute(reservation: Reservation): Promise<Reservation | null> {
        return this.reservationInterface.create(reservation);
    }
}