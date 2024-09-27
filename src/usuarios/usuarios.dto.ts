import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, } from "class-validator";

export class UsuarioDto {
    
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

      @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean = true;

    @IsString()
    avatar: string;

    @IsNotEmpty()
    usuarioOcupado: boolean;

    @IsNotEmpty()
    deptoOcupado: boolean;

    @IsNotEmpty()
    departamento: UsuarioDto;

   
}