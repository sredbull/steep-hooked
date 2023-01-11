import { Module } from '@nestjs/common';
import { ZwiftMemoryMonitor } from './services/zwift.memory.monitor.service';
import { ConsoleModule } from 'nestjs-console';
import { StartService } from './console/start.service';

@Module({
  imports: [ConsoleModule],
  providers: [StartService, ZwiftMemoryMonitor],
})
export class AppModule {}
