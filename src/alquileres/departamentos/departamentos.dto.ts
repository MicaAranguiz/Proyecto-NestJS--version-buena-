import { IsBoolean, IsEmail, IsOptional, IsString, } from "class-validator";

export class DepartamentosDto {
   
    id: number;

    @IsOptional()
    nombre: string;
    
    @IsOptional()
    descripcion: string;
}