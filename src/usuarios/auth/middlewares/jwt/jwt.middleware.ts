import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../auth.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(
        private readonly authService: AuthService,
        private readonly usuariosService: UsuariosService
    ) {}

    async use(req: any, res: any, next: () => void) {
        // Permitir todas las solicitudes GET sin token
        if (req.method === 'GET') {
           
            const authHeader = req.headers['authorization'];
            if (authHeader) {
                console.log(`Token en GET: ${authHeader}`); // Mostrar el token en la consola
            }
            return next(); // Continúa sin verificar el token
        }

        // Para solicitudes que no son GET, verifica el token
        const authHeader = req.headers['authorization'];
        
        if (!authHeader) {
            throw new UnauthorizedException('No se proporcionó un token');
        }

        const tokenArray = authHeader.split(' '); // Separar por espacio
        if (tokenArray[0] !== 'Bearer' || !tokenArray[1]) {
            throw new UnauthorizedException('Token no válido');
        }

        const decodedToken = await this.authService.verifyJwt(tokenArray[1]);

        if (decodedToken) {
            const usuario = await this.usuariosService.buscaUno(decodedToken.sub);
            if (usuario) {
                req.user = usuario; // Puedes agregar el usuario a la solicitud
                return next();
            } else {
                throw new UnauthorizedException('Token inválido');
            }
        } else {
            throw new UnauthorizedException('Token inválido');
        }
    }
}
