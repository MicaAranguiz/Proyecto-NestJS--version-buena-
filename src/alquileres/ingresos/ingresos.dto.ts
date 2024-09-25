import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, } from "class-validator";
import { Usuarios } from "src/usuarios/usuarios.entity";
import { Parcelas } from "../parcelas/parcelas.entity";

export class IngresosDto {
  
    id: number;

    @IsOptional()
    diaentrada: Date

    @IsOptional()
    diasalida: Date

    @IsNotEmpty()
    usuario: Usuarios;
    
    @IsNotEmpty()
    parcela: Parcelas;

}