import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { Roles } from 'src/usuarios/auth/guards/roles.decorator';
import { RolesGuard } from 'src/usuarios/auth/guards/roles.guard';
import { ReservasService } from './reservas.service';
import { Estado, Reservas } from './reservas.entity'; // Importa el enum
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common';
import { Response } from 'express';

@Controller('reservas')
export class ReservasController {
    service: any;
    constructor(@InjectRepository(Reservas)
    private readonly reservaRepository: Repository<Reservas>) { }

    // Crear una reserva, solo accesible para los usuarios
    @Post('reservar-departamento')
    @Roles('user') // Solo usuarios pueden acceder
    @UseGuards(RolesGuard) // Usa el guard para verificar roles
    async solicitarReserva(
        @Body('diadesde') diadesde: Date,
        @Body('diahasta') diahasta: Date,
        @Body('usuario') usuarioId: number,
        @Body('departamento') departamentoId: number,
    ) {
        return this.service.hacerReserva(diadesde, diahasta, usuarioId, departamentoId);
    }

    // Método para que el administrador acepte o rechace una reserva
    @Post('actualizar-reserva/:id')
    @Roles('admin') // Solo administradores pueden acceder
    @UseGuards(RolesGuard) // Usa el guard para verificar roles
    async actualizarReserva(
        @Param('id') id: number,
        @Body('estado') estado: string,
    ) {
        return this.service.actualizarEstadoReserva(id, estado);
    }
    
    //una reserva
    @Get(':id')
    async buscaPorId(@Param('id') id: number, @Res() response: Response) {
        const reserva = await this.service.getOne(id);
        response.status(HttpStatus.OK).json({ ok: true, reserva, msg: 'Aprobado' })
    }

    //todas las reservas
    @Get('/')
    async buscaTodo(@Query() paginationQuery: PaginationQueryDto, @Res() response: Response) {
        const reservas = await this.service.getAll(paginationQuery);
        response.status(HttpStatus.OK).json({ ok: true, reservas, msg: 'Aprobado' })
    }
}

