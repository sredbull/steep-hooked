import { ZwiftPacketMonitor } from '../services/zwift.packet.monitor.service';
import { Console, Command, createSpinner } from 'nestjs-console';

@Console()
export class StartService {
  constructor(private readonly zwiftPacketMonitor: ZwiftPacketMonitor) {}

  @Command({
    command: 'start',
    description: 'Start the monitor server',
  })
  start(): void {
    const spin = createSpinner();

    spin.start('Starting monitor');

    this.zwiftPacketMonitor.start();
  }
}
