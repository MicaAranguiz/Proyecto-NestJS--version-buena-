import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservas } from './reservas.entity';
import { Departamentos } from '../departamentos/departamentos.entity';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import { AuthService } from 'src/usuarios/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { ReservasController } from './reservas.controller';

@Module({
  //este metodo hace que se de de alta en la base de datos
  imports: [TypeOrmModule.forFeature([Reservas, Departamentos, Usuarios])],
  controllers: [ReservasController],
  providers: [ReservasService, AuthService, JwtService, UsuariosService]
})
export class ReservasModule {}
