import { IsNotEmpty, IsOptional } from "class-validator";
import { UsuarioDto } from "src/usuarios/usuarios.dto";
import { DepartamentosDto } from "../departamentos/departamentos.dto";
import { Estado } from "./reservas.entity";

export class ReservasDto {
    id: number;

    @IsOptional()
    diadesde: Date;

    @IsOptional()
    diahasta: Date;

    @IsNotEmpty() 
    usuario: UsuarioDto;

    @IsNotEmpty() 
    departamento: DepartamentosDto;

    @IsNotEmpty() 
    estado: Estado;

    userId: number;
}
