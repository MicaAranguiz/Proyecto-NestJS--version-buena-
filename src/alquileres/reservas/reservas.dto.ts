import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, } from "class-validator";
import { UsuarioDto } from "src/usuarios/usuarios.dto";
import { DepartamentosDto } from "../departamentos/departamentos.dto";
import { Estado } from "./reservas.entity";

export class ReservasDto {

    id: number;

    @IsOptional()
    diadesde: Date;

    @IsOptional()
    diahasta: Date;

    @IsNotEmpty() // no debe ser vacio
    @IsNotEmpty()
    usuario: UsuarioDto;

    @IsNotEmpty() // no debe ser vacio
    departamento: DepartamentosDto;

    @IsNotEmpty() // no debe ser vacio
    estado: Estado;
    userId: any;

}