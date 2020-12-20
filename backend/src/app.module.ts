import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { NotifiersModule } from './notifiers/notifiers.module';
import { FileWatchService } from './file-watch.service';

@Module({
  imports: [ConfigModule, NotifiersModule],
  controllers: [AppController],
  providers: [AppService, FileWatchService],
})
export class AppModule {}
