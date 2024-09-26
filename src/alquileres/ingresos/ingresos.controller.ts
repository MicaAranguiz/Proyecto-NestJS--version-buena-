import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { PaginationQueryDto } from 'src/common';
import { Response } from 'express';

@Controller('ingresos')
export class IngresosController {

    constructor(private readonly service: IngresosService) { }

    //comenzamos cargando una entrada
    @Post('entrada-a-parcela')
    async ocuparUnaParcela(
        @Body('usuarioId') usuarioId: number,
        @Body('parcelaId') parcelaId: number,
    )
    // le pasa los parametros obtenidos anteriormente
    {
        const result = this.service.ocuparUnaParcela(usuarioId, parcelaId);
        return result;
    }
}
