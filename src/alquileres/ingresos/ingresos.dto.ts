import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, } from "class-validator";
import { ParcelasDto } from "../parcelas/parcelas.dto";
import { UsuarioDto } from "src/usuarios/usuarios.dto";


export class IngresosDto {
  
    id: number;

    @IsOptional()
    diaentrada: Date

    @IsOptional()
    diasalida: Date

    @IsNotEmpty()
    usuario: UsuarioDto;

    @IsNotEmpty()
    parcela: ParcelasDto
}