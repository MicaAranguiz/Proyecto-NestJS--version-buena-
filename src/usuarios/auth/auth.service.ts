import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { UsuarioDto } from "../usuarios.dto";
import { UsuariosService } from "../usuarios.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usuariosService: UsuariosService
    ) {}

    async verifyJwt(jwt: string): Promise<any> {
        return await this.jwtService.verifyAsync(jwt);
    }

    async generateJwt(payload: { id: number; email: string; nombre: string }): Promise<string> {
        return this.jwtService.signAsync(payload); 
    }
    
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async comparePassword(password: string, hashPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashPassword);
    }

    async login(email: string, password: string): Promise<{ access_token: string }> {
        const usuario = await this.usuariosService.findByEmail(email);
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }

        const isPasswordValid = await this.comparePassword(password, usuario.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = { id: usuario.id, email: usuario.email, nombre: usuario.nombre };
        const access_token = await this.generateJwt(payload);

        return { access_token };
    }
}
