import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioDto } from './usuarios.dto';
import { Response } from 'express' // este siempre de express
import { PaginationQueryDto } from 'src/common';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuarioService: UsuariosService) { }
    @Get(':id')
    async getOne(@Param('id') id: number, @Res() res: Response) {
        const usuario = await this.usuarioService.buscaUno(id);
        res.status(HttpStatus.OK).json({ ok: true, usuario, msg: 'Aprobado' });
    }
    @Get()
    async getAll(@Query() paginationQuery: PaginationQueryDto, @Res() res: Response) {
        const usuario = await this.usuarioService.buscaTodo(paginationQuery);
        res.status(HttpStatus.OK).json({ ok: true, usuario, msg: 'Aprobado' });
    }
    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response) {
        const result = await this.usuarioService.delete(id);
        res.status(HttpStatus.OK).json({ ok: true, result, msg: 'Aprobado' });
    }
    @Post()
    async register(@Body() usuario: UsuarioDto, @Res() response: Response) {
        const result = await this.usuarioService.register(usuario); //deberia ir usuario dentro de los parentesis
        response
            .status(HttpStatus.CREATED)
            .json({ ok: true, result, msg: ' Creado con exito' })
    }
}
