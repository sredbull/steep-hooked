import { ZwiftPacketMonitor } from '../services/zwift.packet.monitor.service';
import { Command, CommandRunner } from 'nest-commander';

@Command({ name: 'start', options: { isDefault: true } })
export class StartCommand implements CommandRunner {
  constructor(private readonly zwiftPacketMonitor: ZwiftPacketMonitor) {}

  async run(inputs: string[], options: Record<string, any>) {
    console.log(this.zwiftPacketMonitor.monitor);

    console.log({ inputs, options });
  }
}
