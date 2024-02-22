
import { Hotel } from "../Entities/Hotel";

export interface UserInterface {
    findByName(email: string): Promise<Hotel | null>;
    findByUUID(uuid: string): Promise<Hotel | null>;
    delete(uuid: string): Promise<void>;
    update(uuid:string, user: Hotel): Promise<Hotel | null>;
    list(): Promise<Hotel[]|null>;
    register(hotel: Hotel): Promise<Hotel | null>;

}
