import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { NotifiersModule } from './notifiers/notifiers.module';
import { FileWatchService } from './file-watch.service';
import { CameraDefinitionModule } from './cameraDefinitions/camera-definition.module';

@Module({
  imports: [ConfigModule, NotifiersModule, CameraDefinitionModule],
  controllers: [AppController],
  providers: [AppService, FileWatchService],
})
export class AppModule {}
