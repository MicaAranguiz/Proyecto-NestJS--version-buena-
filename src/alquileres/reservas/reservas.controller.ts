import { Body, Controller, Post } from '@nestjs/common';
import { ReservasService } from './reservas.service';

@Controller('reservas')
export class ReservasController {
    constructor(private readonly service: ReservasService) { }

    //coenzamos creando una reserva de departamento con todos sus datos
    @Post('reservar-departamento')
    async solicitarReserva(
        @Body('desde dia') diadesde: Date,
        @Body('hasta dia') diahasta: Date,
        @Body('usuario') usuarioId: number,
        @Body('departamento') departamentoId: number,
    ) 
    {
       // le pasa los parametros obtenidos anteriormente
      //  const result = this.service.hacerReserva(diadesde, diahasta, usuarioId, departamentoId);
     //   return result;
    }

}
