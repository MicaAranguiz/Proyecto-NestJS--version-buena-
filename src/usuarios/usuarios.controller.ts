import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioDto } from './usuarios.dto';
import { Response } from 'express' // este siempre de express

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuarioService: UsuariosService){}

    @Post()
    async register(@Body()usuario: UsuarioDto, @Res() response: Response){
        const result = await this.usuarioService.register(usuario); //deberia ir usuario dentro de los parentesis
        response
        .status(HttpStatus.CREATED)
        .json ({ ok:true, result, msg : ' creado'})
    }
}
