import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import { AuthService } from 'src/usuarios/auth/auth.service';
import { Departamentos } from '../departamentos/departamentos.entity';
import { UsuarioDto } from 'src/usuarios/usuarios.dto';
import { DepartamentosDto } from '../departamentos/departamentos.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';


// DEPARTAMENTO VA CON RESERVA
@Injectable()
export class ReservasService {
    constructor(
        @InjectRepository(Departamentos)
        private readonly departamentoRepository: Repository<DepartamentosDto>,
        @InjectRepository(Usuarios)
        private readonly usuarioRepository: Repository<UsuarioDto>,
        private authService: AuthService,
        private readonly parcelasService: UsuariosService ) {}

//     async hacerReserva(desde: Date, hasta: Date, usuarioId: number, departamentoId: number): Promise<Departamentos> {
      
//         const usuario = await this.depar.findOne({ where: { id: usuarioId } });
//         const departamento = await this.departamentoRepository.findOne({ where: { id: departamentoId}})
//         // Controlamos si el usuario y el departamento existen o no

//         if (!usuario) {
//             throw new NotFoundException('El usuario mencionado no fue encontrado');
//         }
//         if(!departamento){
//             throw new NotFoundException('El departamento mencionado no fue encontrado')
//         }

//         //Consultamos el estado del departamento

//         if (departamento.deptoOcupado) {
//             throw new BadRequestException('El departamento indicado ya está ocupado');
//         }

//         if (usuario.usuarioOcupado) {
//             throw new BadRequestException('El usuario indicado ya está regissrado');
//         }

//         departamento.deptoOcupado = true;
//         usuario.departamento = usuario;
//         await this.departamentoRepository.save(departamento);

//         return departamento;
     
//     }
// }
    }