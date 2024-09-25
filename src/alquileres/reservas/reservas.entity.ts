import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('reservas')
export class Reservas {
    @PrimaryGeneratedColumn('increment')
    id: number;

}