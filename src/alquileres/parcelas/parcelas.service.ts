import { Injectable, NotFoundException, BadRequestException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import { ParcelasDto } from './parcelas.dto';
import { Parcelas } from './parcelas.entity';
import { PaginationQueryDto } from 'src/common';

//INGRESO VA CON PARCELA

@Injectable()
export class ParcelasService {
    constructor(@InjectRepository(Usuarios)
    private readonly usuarioRepository: Repository<Usuarios>,
        @InjectRepository(Parcelas)
        private readonly parcelaRepository: Repository<ParcelasDto>
    ) { }

    // vamos a buscar una parcela en especifico, tomando por el ID
    async getOne(id: number): Promise<ParcelasDto> {
        try {
            //definimos que la parcela se obtiene por el ID
            const buscaParcela = await this.parcelaRepository.findOne({ where: { id } });
            //verificamos su existencia
            if (!buscaParcela) throw new NotFoundException(`La parcela mencionada por el numero: ${id} no fue encontrada`)
            //devolvemos el numero de parcela
            return buscaParcela;
        }
        // capturamos el error en caso de que lo haya
        catch (err) {
            console.error(err)
            if (err instanceof QueryFailedError)
                throw new HttpException(`${err.name} ${err.driverError}`, 404);
            throw new HttpException(err.message, err.status)
        }
    }


    //paginador para mostrar la informacion de las parcelas y quienes las o
    async getAll(paginationQuery: PaginationQueryDto): Promise<{
        data: ParcelasDto[];
        total: number;
        page: number;
        limit: number;
    }> {
        //limite de datos por pagina
        const { page = 1, limit = 20 } = paginationQuery;
        try {
            const [parcelas, total] = await this.parcelaRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit
            })
            const parcelaPaginator = await this.parcelaRepository.find();
            if (!parcelaPaginator) throw new NotFoundException('No pudimos encontrar una parcela')
            return { data: parcelas, total, page, limit };
        } catch (err) {
            console.error(err)
            if (err instanceof QueryFailedError)
                throw new HttpException(`${err.name} ${err.driverError}`, 404);
            throw new HttpException(err.message, err.status)
        }

    }

    //actualiza el valor de parcelaOcupada a true
    //tomamos como valor el ID
    async actualizaVacia(id: number) {

        try {
            const parcelaVacia = await this.parcelaRepository.findOne({ where: { id } });
            if (!parcelaVacia) throw new NotFoundException('No encontramos ninguna parcela con el id ${id}')
            //actualiza el valor y pone la parcela en ocupada= false
            await this.parcelaRepository.update(parcelaVacia, { parcelaOcupada: false });
            return parcelaVacia;
        }
        //En caso de error, hace esto
        catch (err) {
            console.error(err);
            if (err instanceof QueryFailedError)
                throw new HttpException(`${err.name} ${err.driverError}`, 404);
            throw new HttpException(err.message, err.status);
        }
    }
    //actualiza el valor de parcelaOcupada a true
    //tomamos como parametro el id 
    async actualizaOcupada(id: number) {

        try {
            const parcelaActualiza = await this.parcelaRepository.findOne({ where: { id } });
            if (!parcelaActualiza) throw new NotFoundException(`No encontramos ninguna parcela con el id ${id}`)
            //actualiza el valor y pone la parcela en ocupada= true
            await this.parcelaRepository.update(parcelaActualiza, { parcelaOcupada: true });
            return parcelaActualiza;
        }
        //En caso de error, hace esto
        catch (err) {
            console.error(err);
            if (err instanceof QueryFailedError)
                throw new HttpException(`${err.name} ${err.driverError}`, 404);
            throw new HttpException(err.message, err.status);
        }
    }
}
