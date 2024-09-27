import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, } from "class-validator";

export class DepartamentosDto {
   
    id: number;

    @IsOptional()
    nombre: string;
    
    @IsOptional()
    descripcion: string;

    @IsNotEmpty()
    deptoOcupado: boolean;

    departamento: DepartamentosDto;

   
}