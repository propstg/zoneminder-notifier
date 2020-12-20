import { Module } from '@nestjs/common';
import { CameraDefinitionModule } from 'src/cameraDefinitions/camera-definition.module';
import { ConfigModule } from 'src/config/config.module';
import { DiscordNotifier } from './discord.notifier';
import { NotifierService } from './notifier.service';

@Module({
  imports: [ConfigModule, CameraDefinitionModule],
  providers: [NotifierService, DiscordNotifier],
  exports: [NotifierService],
})
export class NotifiersModule{}
