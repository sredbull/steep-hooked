import { Injectable } from '@nestjs/common';
import _ZwiftPacketMonitor from '@zwfthcks/zwift-packet-monitor';
import Cap from 'cap';
import InternalIp from 'internal-ip';

@Injectable()
export class ZwiftPacketMonitor {
  get ip() {
    return (async () => {
      return await InternalIp.v4();
    })();
  }

  get device() {
    return Cap.findDevice(this.ip);
  }

  get monitor() {
    return new _ZwiftPacketMonitor(this.device);
  }
}
