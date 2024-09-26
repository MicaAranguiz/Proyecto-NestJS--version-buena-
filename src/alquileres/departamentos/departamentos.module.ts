import { Module } from '@nestjs/common';
import { DepartamentosController } from './departamentos.controller';
import { DepartamentosService } from './departamentos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departamentos } from './departamentos.entity';

@Module({
  //este metodo hace que se de de alta en la base de datos
  imports: [TypeOrmModule.forFeature([Departamentos])],
  controllers: [DepartamentosController],
  providers: [DepartamentosService]
})
export class DepartamentosModule { }
