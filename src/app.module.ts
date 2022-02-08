import { Module } from '@nestjs/common';
import { ZwiftPacketMonitor } from './services/zwift.packet.monitor.service';
import { ConsoleModule } from 'nestjs-console';
import { StartService } from './console/start.service';

@Module({
  imports: [ConsoleModule],
  providers: [StartService, ZwiftPacketMonitor],
})
export class AppModule {}
