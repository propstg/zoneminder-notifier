import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CameraDefinitionService } from './cameraDefinitions/camera-definition.service';
import { CameraDefinition } from './config/cameraDefinition';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly cameraDefinitionService: CameraDefinitionService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/camera/:id")
  getNotificationStatus(@Param("id") cameraId: string) {
    return this.cameraDefinitionService.getDefinition(cameraId);
  }

  @Post("/camera/:id")
  setNotificationStatus(@Param("id") cameraId: string, @Body() cameraDefinition: CameraDefinition) {
    return this.cameraDefinitionService.setNotifications(cameraId, cameraDefinition.notify);
  }
}
