import { Injectable } from '@nestjs/common';
import _ZwiftPacketMonitor from '@zwfthcks/zwift-packet-monitor';
import Cap from 'cap';
import * as internalIp from 'internal-ip';

@Injectable()
export class ZwiftPacketMonitor {
  private period = 3;

  get ip(): string {
    return internalIp.v4.sync();
  }

  get device(): string {
    return Cap.findDevice(this.ip);
  }

  get monitor(): _ZwiftPacketMonitor {
    return new _ZwiftPacketMonitor(this.device);
  }

  simpleMovingAverager(period: number) {
    const nums = [];

    return function (num: number) {
      let sum = 0;
      let n = period;

      nums.push(num);
      if (nums.length > period) {
        nums.splice(0, 1);
      }

      for (const i in nums) {
        sum += nums[i];
      }

      if (nums.length < period) {
        n = nums.length;
      }

      return sum / n;
    };
  }
}
