import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res  } from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { PaginationQueryDto } from 'src/common';
import { Response } from 'express';
import { ParcelasDto } from '../parcelas/parcelas.dto';


@Controller('ingresos')
export class IngresosController {

    constructor(private readonly service: IngresosService) { }

    //comenzamos cargando una entrada
    @Post('entrada-a-parcela')
    async ocuparUnaParcela(
        @Body('usuarioId') usuarioId: number,
        @Body('parcelaId') parcelaId: number,
        @Body('codigoIngreso') codigoIngresoId: number,
    )
    // le pasa los parametros obtenidos anteriormente
    {
        const respuesta = this.service.ocuparUnaParcela(usuarioId, parcelaId, codigoIngresoId);
        return respuesta;
    }

    // registramos una salida
    @Post('salida-de-parcela')
    async desocuparParcela(
        @Body('parcelaId') parcelaId: number,
        @Body('usuarioId') usuarioId: number,
        @Body('codigoIngreso') codigoIngresoId: number,
    ) 
    //Toma todos los datos para recurrir a la funcion de desocupar una parcela en parcelas
    {
        const respuesta = await this.service.desocuparUnaParcela(parcelaId, usuarioId, codigoIngresoId);
        return respuesta;
    }

    //actualiza revisar
    // async update(@Param('id') id: number, @Body() actualiza: ParcelasDto ) {
    //     // Llama a un método del servicio para actualizar la parcela
    //     const updatedParcela = await this.service.ocuparUnaParcela(id, ocuparUnaParcela);
    //     return updatedParcela;
    // }
    
    //Obtenemos toda la colección de ingresos
    @Get('/')
    async buscaTodo(@Query() paginationQuery: PaginationQueryDto, @Res() response: Response) {
        const ingresos = await this.service.buscaTodo(paginationQuery);
        response.status(HttpStatus.OK).json({ ok: true, ingresos, msg: 'Busqueda aprobada'})
    }

    //Obtenemos el ingreso por su ID
    @Get(':id')
    async buscaPorId(@Param('id') id: number, @Res() response: Response) {
        const ingreso = await this.service.buscaPorId(id);
        response.status(HttpStatus.OK).json({ ok: true, ingreso, msg: 'Busqueda aprobada'})
    }
}
