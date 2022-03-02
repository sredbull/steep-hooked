import ZwiftPacketMonitor from '@zwfthcks/zwift-packet-monitor';
import Cap from 'cap';
import { internalIpV4 } from 'internal-ip';

const ip = await internalIpV4();
const device = Cap.findDevice(ip);
const monitor = new ZwiftPacketMonitor(device);

console.log('Listening on: ', ip, JSON.stringify(device, null, 4));

let distancePrevious = 0;
let altitudePrevious = 0;
let slopePrevious = 0;
let nbRuns = 0;
let mSma = simpleMovingAverager(3);

monitor.on('outgoingPlayerState', (playerState, serverWorldTime) => {
  if (playerState.distance > distancePrevious + 3 && nbRuns > 4) {
    let angle = Math.asin(
      (playerState.altitude - altitudePrevious) /
        (200 * (playerState.distance - distancePrevious)),
    );
    let slpPc = 100 * Math.tan(angle);
    let slopePc = mSma(slpPc);

    console.log('Simulating ' + slpPc + '% incline pckt ' + nbRuns);

    if (Math.abs(slopePc - slopePrevious) > 0.9) {
      try {
        let slope = (slopePc + 200) * 100;

        // gpio set

        console.log(slope);
      } catch (error) {
        console.log(error);
      }

      slopePrevious = slopePc;
    }

    distancePrevious = playerState.distance;
    altitudePrevious = playerState.altitude;

    nbRuns = 1;
  } else if (nbRuns == 0 || playerState.distance < distancePrevious) {
    distancePrevious = playerState.distance;
    altitudePrevious = playerState.altitude;
  }

  nbRuns = nbRuns + 1;
});

monitor.start();

function simpleMovingAverager(period) {
  var nums = [];
  return function (num) {
    nums.push(num);
    if (nums.length > period) nums.splice(0, 1);
    var sum = 0;
    for (var i in nums) sum += nums[i];
    var n = period;
    if (nums.length < period) n = nums.length;
    return sum / n;
  };
}
