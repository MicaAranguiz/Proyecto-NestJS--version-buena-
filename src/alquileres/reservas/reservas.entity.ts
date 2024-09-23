import { Usuarios } from "src/usuarios/usuarios.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Departamento } from "../departamentos/departamentos.entity";

export enum Estado {
    PENDING = "pendiente",
    ACCEPTED = "aceptada",
    REFUSED = "rechazada"
}

@Entity('reservas')
export class Reserva {
    //identificador de ingreso
    @PrimaryGeneratedColumn('increment')
    id: number;

    //fechas de la reserva
    @Column({ type: 'date', nullable: false })
    desde: Date
    @Column({ type: 'date', nullable: false })
    hasta: Date

    //quien ingresa
    @ManyToOne(() => Usuarios, usuario => usuario.id)
    @JoinColumn({ name: 'userId' })
    usuario: Usuarios;

    //a que departamento ingresa
    @ManyToOne(() => Departamento, departamento => departamento.id)
    @JoinColumn({ name: 'deptoId' })
    departamento: Departamento;

    //el usuario no hace nada. El admin aprueba o rechaza
    @Column({
        type: 'enum',
        enum: Estado,
        default: Estado.PENDING
    })
    estado: Estado;
}