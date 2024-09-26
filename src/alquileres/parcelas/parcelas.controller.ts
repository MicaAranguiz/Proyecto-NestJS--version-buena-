import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { ParcelasService } from './parcelas.service';
import { PaginationQueryDto } from 'src/common';
import { Response } from 'express';

@Controller('parcelas')
export class ParcelasController {
    constructor(private readonly service: ParcelasService) { }

    //para buscar todas las parcelas de la coleccion
    @Get('/')
    async buscaTodo(@Query() paginationQuery: PaginationQueryDto, @Res() response: Response) {
        const parcelas = await this.service.getAll(paginationQuery);
        response.status(HttpStatus.OK).json({ ok: true, parcelas, msg: 'Aprobado' })
    }
    //paara buscar parcelas por id
    @Get(':id')
    async buscaPorId(@Param('id') id: number, @Res() response: Response) {
        const parcela = await this.service.getOne(id);
        response.status(HttpStatus.OK).json({ ok: true, parcela, msg: 'Aprobado' })
    }
}

