import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('parcelas')
export class Parcelas {
    //todos van a tener su propio identificador
    @PrimaryGeneratedColumn('increment')
    id: number;

    //el respectivo nombre del departamento
    @Column ({type: 'varchar', nullable: true})
    nombre: string;

    //descripcion del departamento
    @Column ({type: 'varchar', nullable: true})
    descripcion: string;

    //estado de la parcela, puede ser true o false
    @Column ({type:'boolean', default:false})
    ocupada: boolean;

}
