import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, } from "class-validator";

export class ParcelasDto {
    id: number;

    @IsOptional()
    nombre: string;

    @IsOptional()
    descripcion: string;

    @IsNotEmpty()
    ocupada: boolean;

    @IsNotEmpty()   
    codigoIngreso: string; // Código único para el ingreso

}           