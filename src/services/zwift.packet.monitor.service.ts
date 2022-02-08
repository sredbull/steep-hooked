import { Injectable } from '@nestjs/common';
import _ZwiftPacketMonitor from '@zwfthcks/zwift-packet-monitor';
import Cap from 'cap';
import * as internalIp from 'internal-ip';

@Injectable()
export class ZwiftPacketMonitor {
  getIp(): string {
    return internalIp.v4.sync();
  }

  getDevice() {
    return Cap.findDevice(this.getIp());
  }

  getMonitor() {
    return new _ZwiftPacketMonitor(this.getDevice());
  }
}
