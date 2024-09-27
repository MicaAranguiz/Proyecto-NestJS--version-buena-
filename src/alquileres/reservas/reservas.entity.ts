import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Departamentos } from "../departamentos/departamentos.entity";
import { Usuarios } from "src/usuarios/usuarios.entity";

export enum Estado {
    PENDING = "pendiente",
    ACCEPTED = "aceptada",
    REFUSED = "rechazada"
}

@Entity('reservas')
export class Reservas {
    //numero de la reserva
    @PrimaryGeneratedColumn('increment')
    id: number;

    //fechas de la reserva, entrada y salida
    @Column({ type: 'date', nullable: false })
    diadesde: Date
    @Column({ type: 'date', nullable: false })
    diahasta: Date

    //quien va a ingresar
    @ManyToOne(() => Usuarios, usuario => usuario.id)
    @JoinColumn({ name: 'usuarioId' })
    usuario: Usuarios;

    //a que departamento ingresa
    @ManyToOne(() => Departamentos, departamento => departamento.id)
    @JoinColumn({ name: 'departamentoId' })
    departamento: Departamentos;

    //el administrador va a indicar el estado en que se encuentra y se encarga de aprobar o rechazar
    // quedó en proceso
    @Column({
        type: 'enum',
        enum: Estado,
        default: Estado.PENDING
    })
    estado: Estado;
    userId: any;
}


