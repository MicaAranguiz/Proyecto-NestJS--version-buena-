import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuarios.entity';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { saveImagesToStorage } from './helpers/image-storage';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (ConfigService: ConfigService) => ({
      secret: ConfigService.get('JWT_SEED'),
      signOptions: {
        expiresIn: '24h'
      },
    }),
  }),
  MulterModule.register({
    dest: '/uploads',
    fileFilter: saveImagesToStorage('avatar').fileFilter,
    storage: saveImagesToStorage('avatar').storage,
  })],
  controllers: [UsuariosController],
  providers: [UsuariosService, AuthService],
  exports: [UsuariosService, AuthService],
})
export class UsuariosModule { }
