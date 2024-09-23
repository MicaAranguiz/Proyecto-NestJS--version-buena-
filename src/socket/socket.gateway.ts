import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
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
        //verificamos el token para poder obtener la info
        const payload = await this.auth.verifyJwt(
          socket.handshake.headers.authorization,
        );

        console.log(
          `usuario conectado con id: ${socket.id}`,
          socket.handshake.headers['usuario'],
        );

        //damos un buen mensaje de bienvenida
        this.server.emit(
          'welcome-message',
          `bienvenido a nuestro servidor usuario ${socket.id}`
        )
        //mandamos informacion de nuestro usuario al servicio
        this.socketService.onConnection(socket, payload);

        const socketUsuario = this.socketService.getSocket(
          +socket.handshake.headers['usuario'],
        );
        if (socketUsuario) {
          socketUsuario.socket.emit(
            `el usuario: ${payload.nombre} se ha conectado`,
            console.log(payload.nombre)
          );
        }

        socket.on('disconnect', () => {
          console.log(`El usuario se ha desconectado con el id: ${socket.id}`);
          //si se desconecta se elimina al usuario 
          this.socketService.onDisconnection(socket);
        });
      } catch (error) {
        //en caso de que se genere error se debe desconectar:
        socket.disconnect();
        //mensaje de informacion
        throw new UnauthorizedException(' La informacion ha incorrecta')
      }
    });
  }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Buenas user!';
  }
}


