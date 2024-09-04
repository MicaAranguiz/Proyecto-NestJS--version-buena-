import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('usuarios')
export class UsuarioEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column ({ type: 'varchar', nullable:true, length:255 })
    nombre: string;
    
    @Column ({type: 'varchar', nullable:false, length:255, unique:true})
    email:string;

    @Column ({type: 'varchar', length: 255, nullable:false})
    password:string;

    @Column ({type: 'bool', default: true})
    isActive:boolean;

    @Column({ type: 'varchar', nullable: false, length: 255})
    avatar: string;
}