import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FileWatchService } from './file-watch.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
  const fileWatchService = app.get(FileWatchService);
  fileWatchService.start();
}
bootstrap();
