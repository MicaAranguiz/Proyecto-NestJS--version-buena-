import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, } from "class-validator";

export class ParcelasDto {
    id: number;

    @IsOptional()
    nombre: string;

    @IsOptional()
    descripcion: string;

    @IsNotEmpty()
    parcelaOcupada: boolean;

    @IsNotEmpty()   
    codigoIngreso: string; // Código único para el ingreso

}           