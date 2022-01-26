import { Module } from '@nestjs/common';
import { AppService } from './services/app.service';
import { ZwiftPacketMonitor } from './services/zwift.packet.monitor.service';
import { StartCommand } from './commands/start.command';

@Module({
  providers: [AppService, ZwiftPacketMonitor, StartCommand],
})
export class AppModule {}
