import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('departamentos')
export class Departamento {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ type: 'varchar', nullable: true })
    nombre: string

}