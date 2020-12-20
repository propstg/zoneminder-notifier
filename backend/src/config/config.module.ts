import { Module } from '@nestjs/common';
import { CONFIG_PROPERTIES } from './config.parser';

@Module({
  providers: CONFIG_PROPERTIES,
  exports: CONFIG_PROPERTIES,
})
export class ConfigModule{}
