import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { DiscordNotifier } from './discord.notifier';
import { NotifierService } from './notifier.service';

@Module({
  imports: [ConfigModule],
  providers: [NotifierService, DiscordNotifier],
  exports: [NotifierService],
})
export class NotifiersModule{}
