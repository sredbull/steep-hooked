import { Injectable } from '@nestjs/common';
import _ZwiftPacketMonitor from '@zwfthcks/zwift-packet-monitor';
import Cap from 'cap';
import * as internalIp from 'internal-ip';

@Injectable()
export class ZwiftPacketMonitor {
  get ip(): string {
    return internalIp.v4.sync();
  }

  get device(): string {
    return Cap.findDevice(this.ip);
  }

  get monitor(): _ZwiftPacketMonitor {
    return new _ZwiftPacketMonitor(this.device);
  }
}
