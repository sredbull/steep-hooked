import { Injectable } from '@nestjs/common';
import _ZwiftMemoryMonitor from '@zwfthcks/zwift-memory-monitor';

@Injectable()
export class ZwiftMemoryMonitor {
  get monitor(): _ZwiftMemoryMonitor {
    return new _ZwiftMemoryMonitor({
      retry: true,
      keepalive: true,
      log: console.log,
      timeout: 250,
      type: 'playerstate',
    });
  }
}
