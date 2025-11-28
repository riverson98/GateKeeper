import { Module } from '@nestjs/common';
import { ResidentModule } from './modules/resident/resident.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot(), ResidentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
