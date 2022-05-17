import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetBlockModule } from './SetBlock/SetBlock.module';

@Module({
  imports: [SetBlockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
