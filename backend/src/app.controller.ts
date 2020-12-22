import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CameraDefinitionService } from './cameraDefinitions/camera-definition.service';
import { CameraDefinition } from './config/cameraDefinition';

@Controller()
export class AppController {
  constructor(
    private readonly cameraDefinitionService: CameraDefinitionService
  ) {}

  @Get("/camera/:id")
  getNotificationStatus(@Param("id") cameraId: string) {
    return this.cameraDefinitionService.getDefinition(cameraId);
  }

  @Post("/camera/:id")
  @HttpCode(200)
  setNotificationStatus(@Param("id") cameraId: string, @Body() cameraDefinition: CameraDefinition) {
    return this.cameraDefinitionService.setNotifications(cameraId, cameraDefinition.notify);
  }
}
