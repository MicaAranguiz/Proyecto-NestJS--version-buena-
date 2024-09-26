import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/usuarios/auth/auth.service';
import { SocketService } from './socket.service';


@WebSocketGateway()
export class SocketGateway implements OnModuleInit {
  constructor(
    private readonly socketService: SocketService,
    private readonly auth: AuthService
  ) { }

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', async (socket: Socket) => {

      try {
        //nos encargamos de verificar el token para obtener/brindar la informacion
        const payload = await this.auth.verifyJwt(
          socket.handshake.headers.authorization,
        );

        console.log(
          `El usuario se encuentra conectado con el id: ${socket.id}`,
          socket.handshake.headers['usuario'],
        );

        //damos un mensaje de bienvenida al comenzar
        this.server.emit(
          'Mensaje de bienvenida',
          `bienvenido a nuestro servidor ${socket.id}`
        )

        //le brindamos al servicio la informacion sobre el usuario
        this.socketService.onConnection(socket, payload);

        const socketUsuario = this.socketService.getSocket(
          +socket.handshake.headers['usuario'],
        );
        if (socketUsuario) {
          socketUsuario.socket.emit(
            `El usuario: ${payload.nombre} se ha conectado exitosamente`,
            console.log(payload.nombre)
          );
        }

        socket.on('disconnect', () => {
          console.log(`El usuario se ha desconectado con el id: ${socket.id}`);
          //si se desconecta se elimina al usuario 
          this.socketService.onDisconnection(socket);
        });

      } catch (error) {
        //Si se llega a generar un error se debe desconectar
        socket.disconnect();

        //Mensaje relacionado a la información
        throw new UnauthorizedException(' La informacion es incorrecta')
      }
    });
  }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return '¡Bienvenido!';
  }
}


