import type { Room } from './Room';

export class RoomModel {
    private room: Room;

    constructor(room: Room) {
        this.room = room;
    }

    get id(): string {
        return this.room.id;
    }

    get name(): string {
        return this.room.name;
    }

    get description(): string {
        return this.room.description;
    }

    get price(): number {
        return this.room.price;
    }

    get guests(): number {
        return this.room.guests;
    }

    get imageUrl(): string {
        return this.room.imageUrl;
    }

    getPriceWithTax(): number {
        const taxRate = 0.2; // 20% poreza
        return +(this.room.price * (1 + taxRate)).toFixed(2);
    }

    getName(): string {
        return this.room.name.toUpperCase();
    }
}