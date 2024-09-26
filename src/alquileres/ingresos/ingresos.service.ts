import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { Ingresos } from './ingresos.entity';
import { IngresosDto } from './ingresos.dto';
import { Parcelas } from '../parcelas/parcelas.entity';
import { ParcelasDto } from '../parcelas/parcelas.dto';
import { ParcelasService } from '../parcelas/parcelas.service';
import { PaginationQueryDto } from 'src/common';

//PARCELA VA CON INGRESO


@Injectable()
export class IngresosService {
   
    constructor(@InjectRepository(Ingresos)
    private readonly ingresoRepository: Repository<IngresosDto>,
        @InjectRepository(Parcelas)
        private readonly parcelaRepositoy: Repository<ParcelasDto>,
        @InjectRepository(Usuarios)
        private readonly usuarioRepository: Repository<Usuarios>,
        private readonly parcelasService: ParcelasService) { }


    // comenzamos con la opcion de que se ocupe una parcela

    async ocuparUnaParcela(usuarioId: number, parcelaId: number, codigoIngresoId: number): Promise<IngresosDto> {
        // definimos los datos que va a tomar para hacer las busquedas
        const buscaParcela = await this.parcelaRepositoy.findOne({ where: { id: parcelaId } });
        const buscaUsuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });

        // chequear que exista la parcela y que no este ocupada
        if (!buscaParcela) { throw new NotFoundException(`La parcela bajo el numero ${parcelaId} no fue encontrada `); }
        if (buscaParcela.parcelaOcupada) { throw new NotFoundException(`La parcela bajo el numero ${parcelaId} se encuentra ocupada`); }


        // Confirmamos si el usuario existe
        if (!buscaUsuario) throw new NotFoundException(`El usuario con el ID ${usuarioId} no fue encontrado`);

        const ingresoRegistrado = this.ingresoRepository.create(
            {
                // cargamos el usuario
                usuario: buscaUsuario,
                // cargamos la parcela
                parcela: buscaParcela,
                // cargamos la fecha de hoy 
                diaentrada: new Date(),
                // cargamos el dia de salida
                diasalida: null,
            }
        )
        // Si se registra un ingreso pasa a estado de Ocupado= true
        if (ingresoRegistrado) this.parcelasService.actualizaOcupada(parcelaId)

        //mostramos la nueva ocupacion
        return this.ingresoRepository.save(ingresoRegistrado)

    }

    // ahora en caso de que toque desocupar una parcela

    async desocuparUnaParcela(parcelaId: number, usuarioId: number, ingresoId: number): Promise<IngresosDto> {

        const buscaParcela = await this.parcelaRepositoy.findOne({ where: { id: parcelaId } });

        // revisamos que la parcela exista y esté ocupada

        if (!buscaParcela) { throw new NotFoundException(`La parcela bajo el numero ${parcelaId} no fue encontrada `); }
        if (!buscaParcela.parcelaOcupada) { throw new NotFoundException(`La parcela bajo el numero ${parcelaId} no esta ocupada`); }

        // registramos que el ingreso existe

        const nuevoIngresoParcela = await this.ingresoRepository.findOne({ where: { id: ingresoId }, relations: ['usuario', 'parcela'] })
        if (!nuevoIngresoParcela) throw new NotFoundException(`El ingreso a la parcela no fue no encontrado`)

        const buscaUsuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });

        // verificamos que el usuario exista

        if (!buscaUsuario) throw new NotFoundException('El usuario no fue encontrado');

        //registramos que los valores de la parcela coincidan

        if (nuevoIngresoParcela.parcela.id !== parcelaId) {
            throw new NotFoundException(
                `La parcela bajo el numero ${parcelaId} no esta en el registro ${ingresoId}`);
        }

        //revisa que el usuario coincida con el ingresado

        if (nuevoIngresoParcela.usuario.id !== usuarioId) {
            throw new NotFoundException(
                `El usuario: ${usuarioId} no esta en el registro ${ingresoId}`);
        }

        // si todas estas condiciones se cumplen, se puede salir del registro
        const salir = (nuevoIngresoParcela.usuario.id == usuarioId && nuevoIngresoParcela.parcela.id == parcelaId)


        // si alguna parcela se desocupa, se cambia el estado enseguida

        if (salir) {
            //cambiar a false la ocupacion parcela/ocupacion
            this.parcelasService.actualizaVacia(parcelaId)
            //cargar la fecha actual en ingresos/salida      
            this.ingresoRepository.update(ingresoId, { diasalida: new Date() })
        }

        //mostramos el final
        return
    }


    async salidaParcela(parcelaId: number) {

        try {
            const salida = await this.ingresoRepository.findOne({ where: { id: parcelaId } });
            if (!salida) throw new NotFoundException('no encontramos ninguna parcela con ese id')
            await this.ingresoRepository.update(parcelaId, { diasalida: new Date() });
            return salida;


        } catch (err) {
            console.error(err);
            if (err instanceof QueryFailedError)
                throw new HttpException(`${err.name} ${err.driverError}`, 404);
            throw new HttpException(err.message, err.status);
        }
    }

    
    async buscaPorId(id: number): Promise<IngresosDto> {
        try {
            const ingreso = await this.ingresoRepository.findOne({ where: { id } , relations: ['usuario', 'parcela']});
            if (!ingreso) throw new NotFoundException('no encontramos ninguna parcela con ese id')
            return ingreso;
        } catch (err) {
            console.error(err)
            if (err instanceof QueryFailedError)
                throw new HttpException(`${err.name} ${err.driverError}`, 404);
            throw new HttpException(err.message, err.status)
        }

    }
    async buscaTodo(paginationQuery: PaginationQueryDto): Promise<{
        data: IngresosDto[];
        total: number;
        page: number;
        limit: number;
    }> {
        const { page = 1, limit = 10 } = paginationQuery;
        try {
            const [ingresos, total] = await this.ingresoRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit, 
                relations: ['usuario', 'parcela']
            })
            const ingreso = await this.ingresoRepository.find();
            if (!ingreso) throw new NotFoundException('no encontramos ninguna parcela')
            return { data: ingresos, total, page, limit };
        } catch (err) {
            console.error(err)
            if (err instanceof QueryFailedError)
                throw new HttpException(`${err.name} ${err.driverError}`, 404);
            throw new HttpException(err.message, err.status)
        }

    }


}
