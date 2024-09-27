import { Injectable, NotFoundException, BadRequestException, ConflictException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Not, QueryFailedError, Repository } from 'typeorm';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import { AuthService } from 'src/usuarios/auth/auth.service';
import { Departamentos } from '../departamentos/departamentos.entity';
import { UsuarioDto } from 'src/usuarios/usuarios.dto';
import { DepartamentosDto } from '../departamentos/departamentos.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Estado, Reservas } from './reservas.entity';
import { ReservasDto } from './reservas.dto';
import { PaginationQueryDto } from 'src/common';
import { ReservasController } from './reservas.controller';


// DEPARTAMENTO VA CON RESERVA

@Injectable()
export class ReservasService {
    [x: string]: any;
    constructor(
        @InjectRepository(Reservas)
        private readonly reservaRepository: Repository<ReservasDto>,
        @InjectRepository(Departamentos)
        private readonly departamentoRepository: Repository<DepartamentosDto>,
        @InjectRepository(Usuarios)
        private readonly usuarioRepository: Repository<UsuarioDto>,
        private authService: AuthService,
        private readonly parcelasService: UsuariosService) { }


    //HACE LA RESERVA

    async hacerReserva(diadesde: Date, diahasta: Date, usuarioId: number, departamentoId: number) {
        const [buscaDepto, buscaUsuario] = await Promise.all([
            this.departamentoRepository.findOne({ where: { id: departamentoId } }),
            this.usuarioRepository.findOne({ where: { id: usuarioId } })
        ]);
        if (!buscaDepto) throw new NotFoundException(`El departamento Nro ${departamentoId} no fue encontrado`);
        if (!buscaUsuario) throw new NotFoundException(`Usuario Nro ${usuarioId} no encontrado`);
        const reservasConfirmadas = await this.reservaRepository.find({
            where: {
                departamento: { id: departamentoId },
                diadesde: Between(diadesde, diahasta)
            }
        });
        if (reservasConfirmadas.length > 0) {
            throw new ConflictException('En esa fecha ya hay una reserva para ese departamento');
        }
        const reserva = this.reservaRepository.create({
            departamento: { id: departamentoId },
            usuario: { id: usuarioId },
            diadesde,
            diahasta,
            estado: Estado.PENDING, // Se establece el estado como 'pendiente' por defecto
        });
        return this.reservaRepository.save(reserva);
    }

    //METODO BUSCA POR EL ID

    
    async buscaPorId(id: number): Promise<ReservasDto> {
        try {
            //definimos que la parcela se obtiene por el ID
            const buscaReserva = await this.parcelaRepository.findOne({ where: { id } });
            //verificamos su existencia
            if (!buscaReserva) throw new NotFoundException(`La reserva mencionada por el numero: ${id} no fue encontrada`)
            //devolvemos el numero de parcela
            return buscaReserva;
        }
        // capturamos el error en caso de que lo haya
        catch (err) {
            console.error(err)
            if (err instanceof QueryFailedError)
                throw new HttpException(`${err.name} ${err.driverError}`, 404);
            throw new HttpException(err.message, err.status)
        }
    }

    async buscaTodo(paginationQuery: PaginationQueryDto): Promise<{
        data: ReservasDto[];
        total: number;
        page: number;
        limit: number;
    }> {
        //limite de datos por pagina
        const { page = 1, limit = 20 } = paginationQuery;
        try {
            const [reservas, total] = await this.reservaRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit
            })
            const parcelaPaginator = await this.parcelaRepository.find();
            if (!parcelaPaginator) throw new NotFoundException('No pudimos encontrar una parcela')
            return { data: reservas, total, page, limit };
        } catch (err) {
            console.error(err)
            if (err instanceof QueryFailedError)
                throw new HttpException(`${err.name} ${err.driverError}`, 404);
            throw new HttpException(err.message, err.status)
        }

    }



    //METODO BUSCA LA COLECCION

    //ADMIN ACEPTA LAS RESERVAS

    async aceptarReserva(id: number): Promise<ReservasDto> {
        const reserva = await this.reservaRepository.findOne({ where: { id } });

        if (!reserva) {
            throw new NotFoundException('Reserva no encontrada');
        }

        if (reserva.estado !== Estado.PENDING) {
            throw new ConflictException('Esta reserva ya fue gestionada');
        }

        reserva.estado = Estado.ACCEPTED;  // Cambia el estado a aceptada
        return this.reservaRepository.save(reserva);
    }

    // RECHAZA LA RESERVA

    async rechazarReserva(id: number): Promise<ReservasDto> {
        const reserva = await this.reservaRepository.findOne({ where: { id } });

        if (!reserva) {
            throw new NotFoundException('Reserva no encontrada');
        }

        if (reserva.estado !== Estado.PENDING) {
            throw new ConflictException('Esta reserva ya fue gestionada');
        }

        reserva.estado = Estado.REFUSED;  // Cambia el estado a rechazada
        return this.reservaRepository.save(reserva);
    }


    async actualizarEstadoReserva(id: number, estado: Estado): Promise<ReservasDto> {
        // Busca la reserva por ID
        const reservaActualizada = await this.reservaRepository.findOne({ where: { id } });

        // Si no se encuentra la reserva, lanza un error
        if (!reservaActualizada) {
            throw new NotFoundException(`Reserva con id ${id} no encontrada`);
        }

        // Actualiza el estado de la reserva
        reservaActualizada.estado = estado;

        // Guarda la reserva actualizada en la base de datos
        await this.reservaRepository.save(reservaActualizada);

        // Convierte la reserva actualizada a DTO y lo devuelve
        return this.convertToDto(reservaActualizada);
    }
}
