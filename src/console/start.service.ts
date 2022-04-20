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

    const mSma = this.zwiftPacketMonitor.simpleMovingAverager(3);
    const nbRuns = 0;
    const distancePrevious = 0;
    const altitudePrevious = 0;
    // let slopePrevious = 0;

    console.log(mSma);

    const monitor = this.zwiftPacketMonitor.monitor;
    monitor.on('outgoingPlayerState', (playerState) => {
      if (playerState.distance > distancePrevious + 3 && nbRuns > 4) {
        let angle = Math.asin(
          (playerState.altitude - altitudePrevious) /
            (200 * (playerState.distance - distancePrevious)),
        );

        let slpPc = 100 * Math.tan(angle);

        //   let slopePc = mSma(slpPc);
        //   console.log('Simulating ' + slpPc + '% incline pckt ' + nbRuns);
        //   if (Math.abs(slopePc - slopePrevious) > 0.9) {
        //     try {
        //       let slope = (slopePc + 200) * 100;
        //       // gpio set
        //       console.log(slope);
        //     } catch (error) {
        //       console.log(error);
        //     }
        //     slopePrevious = slopePc;
        //   }
        //   distancePrevious = playerState.distance;
        //   altitudePrevious = playerState.altitude;
        //   nbRuns = 1;
        // } else if (nbRuns == 0 || playerState.distance < distancePrevious) {
        //   distancePrevious = playerState.distance;
        //   altitudePrevious = playerState.altitude;
        // }
        // nbRuns = nbRuns + 1;
      }
    });

    monitor.start();
  }
}
