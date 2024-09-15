import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { UsuariosService } from './usuarios/usuarios.service';
import { UsuarioDto } from './usuarios/usuarios.dto';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';


@Controller('usuarios')
export class AppController {
  constructor (private readonly service: UsuariosService){}

  @Post('auth/register')
  async register(@Body() usuario:UsuarioDto, @Res() response: Response){
    const result = await this.service.register(usuario);
    response
    .status(HttpStatus.CREATED)
    .json({ ok: true, result, msg: 'creado'})
  }

  @Post('auth/login')
  async login(){}

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files'))
  async updateUser(
    @Param('id') id: number,
    @Body() user: Partial<UsuarioDto>,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ){
    const result = await this.service.updateUser(id, user, files);
    res.status(HttpStatus.OK).json({ pl:true, result, msg:'approved'})
  }
}
