import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import { Repository } from 'typeorm';
import { Ingresos } from './ingresos.entity';
import { IngresosDto } from './ingresos.dto';
import { Parcelas } from '../parcelas/parcelas.entity';
import { ParcelasDto } from '../parcelas/parcelas.dto';
import { ParcelasService } from '../parcelas/parcelas.service';

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

    ocuparUnaParcela(usuarioId: number, parcelaId: number) {

    }

}
