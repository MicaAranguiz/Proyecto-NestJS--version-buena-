import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Payload } from 'src/common';

@Injectable()
export class SocketService {

    /**
     * @description
     * Almacenamos los usuarios conectados
     */
    private clients: { [key: string]: { socket: Socket; payload: Payload } } = {};

    /**
         * @description
         * obtenemos un socket a traves de un id de un usuario
         */
    getSocket(id: number) {
        //recorremos la lista de los usuarios
        for (let key in this.clients) {

            //brindamos el valor
            if (this.clients[key].payload.sub == id) return this.clients[key];

            //si no llegara a existir, retornamos un nulo
            else return null
        }
    }
    /**
     * @description
     * Almacenamos el socket del usuario , lo identificamos por el ID unico que le fue asignado
     */
    onConnection(socket: Socket, payload: Payload) {
        this.clients[socket.id] = { socket: socket, payload: payload };
    }
    /**
     * @description
     * Cuando se desconecte, se borra
     */
    onDisconnection(socket: Socket) {
        delete this.clients[socket.id];
    }
}
