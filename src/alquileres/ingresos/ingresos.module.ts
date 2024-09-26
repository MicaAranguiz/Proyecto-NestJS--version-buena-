import { Module } from '@nestjs/common';
import { IngresosController } from './ingresos.controller';
import { IngresosService } from './ingresos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingresos } from './ingresos.entity';
import { Parcelas } from '../parcelas/parcelas.entity';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import { ParcelasService } from '../parcelas/parcelas.service';

@Module({
  imports: [
    //este metodo hace que se de de alta en la base de datos
    TypeOrmModule.forFeature([Ingresos, Parcelas, Usuarios]),
  ],
  controllers: [IngresosController],
  providers: [IngresosService, ParcelasService]
})
export class IngresosModule {}
