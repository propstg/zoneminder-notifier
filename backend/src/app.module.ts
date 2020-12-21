import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { NotifiersModule } from './notifiers/notifiers.module';
import { FileWatchService } from './file-watch.service';
import { CameraDefinitionModule } from './cameraDefinitions/camera-definition.module';

@Module({
  imports: [ConfigModule, NotifiersModule, CameraDefinitionModule],
  controllers: [AppController],
  providers: [FileWatchService],
})
export class AppModule {}
