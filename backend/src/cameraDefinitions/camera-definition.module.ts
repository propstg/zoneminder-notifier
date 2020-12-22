import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { CameraDefinitionService } from './camera-definition.service';

@Module({
  imports: [ConfigModule],
  providers: [CameraDefinitionService],
  exports: [CameraDefinitionService],
})
export class CameraDefinitionModule{}
