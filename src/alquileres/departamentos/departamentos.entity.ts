import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('departamentos')
export class Departamentos {
    //todos van a tener su propio identificador
    @PrimaryGeneratedColumn('increment')
    id: number;

    //el respectivo nombre del departamento
    @Column ({type: 'varchar', nullable: true})
    nombre: string;

    //descripcion del departamento
    @Column ({type: 'varchar', nullable: true})
    descripcion: string;

}