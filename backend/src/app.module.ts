import { Module } from '@nestjs/common';
import { ResidentModule } from './modules/resident/resident.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [EventEmitterModule.forRoot(), ResidentModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
