import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('parcelas')
export class Parcelas {
    @PrimaryGeneratedColumn('increment')
    id: number;

}