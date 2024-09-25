import { Module } from '@nestjs/common';
import { ParcelasService } from './parcelas.service';
import { ParcelasController } from './parcelas.controller';

@Module({
  providers: [ParcelasService],
  controllers: [ParcelasController]
})
export class ParcelasModule {}
