import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ingresos')
export class Ingresos {
    @PrimaryGeneratedColumn('increment')
    id: number;

}