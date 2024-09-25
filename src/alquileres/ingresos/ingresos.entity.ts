import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Parcelas } from "src/alquileres/parcelas/parcelas.entity";
import { Usuarios } from "src/usuarios/usuarios.entity";

@Entity('ingresos')
export class Ingresos {
    //el numero del ingreso
    @PrimaryGeneratedColumn('increment')
    id: number;

    //cuando va a hacer uso de la parcela
    @Column({ type: 'date', nullable: false })
    diaentrada: Date

    @Column({ type: 'date', nullable: true })
    diasalida: Date

    //quien ingresa
    @ManyToOne(() => Usuarios, usuario => usuario.id) //busca en la tabla, se guia por el id siempre
    @JoinColumn({name: 'userId'}) //define cual es la clave foranea
    usuario: Usuarios;
    
    //hace la union, a cual parcela va a ir
    @ManyToOne(() => Parcelas, parcela => parcela.id) // tambien se va a guiar por el id
    @JoinColumn({name: 'parcelaId'}) //clave foranea
    parcela: Parcelas;

}