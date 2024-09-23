import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtMiddleware } from './usuarios/auth/middlewares/jwt/jwt.middleware';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller'
import { db } from './config';
import { SocketModule } from './socket/socket.module';
import { ParcelasModule } from './alquileres/parcelas/parcelas.module';
import { DepartamentosModule } from './alquileres/departamentos/departamentos.module';
import { IngresosModule } from './alquileres/ingresos/ingresos.module';
import { ReservasModule } from './alquileres/reservas/reservas.module';

@Module({
  imports: [
  TypeOrmModule.forRoot(db),UsuariosModule,   SocketModule,
  ParcelasModule,
  DepartamentosModule,
  IngresosModule,
  ReservasModule],
  controllers: [AppController], 
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        {
          path: '/usuarios/auth/login',
          method: RequestMethod.POST,
        },
        {
          path: '/usuarios/auth/register',
          method: RequestMethod.POST,
        },
      ).forRoutes('');
  }
}
