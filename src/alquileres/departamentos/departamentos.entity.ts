import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('departamentos')
export class Departamentos {
    @PrimaryGeneratedColumn('increment')
    id: number;

}