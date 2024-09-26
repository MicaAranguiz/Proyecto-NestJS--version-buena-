import { Module } from '@nestjs/common';
import { ParcelasController } from './parcelas.controller';
import { ParcelasService } from './parcelas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parcelas } from './parcelas.entity';
import { Usuarios } from 'src/usuarios/usuarios.entity';

@Module({
  imports: [
    //para que cree la tabla en la bd
    TypeOrmModule.forFeature([Parcelas, Usuarios]),
  ],
  controllers: [ParcelasController],
  providers: [ParcelasService]
})
export class ParcelasModule { }
