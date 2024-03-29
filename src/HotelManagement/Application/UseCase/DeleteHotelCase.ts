import { HotelInterface } from "../../Domain/Port/HotelInterface";

export class DeleteHotelCase {
    constructor(readonly hotelInterface: HotelInterface) {}

    async execute(uuid: string): Promise<void> {
        await this.hotelInterface.delete(uuid);
    }
}