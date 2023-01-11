import { ZwiftMemoryMonitor } from '../services/zwift.memory.monitor.service';
import { Console, Command, createSpinner } from 'nestjs-console';
import { PlayerState } from '../types/zwift';

@Console()
export class StartService {
  constructor(private readonly zwiftMemoryMonitor: ZwiftMemoryMonitor) {}

  @Command({
    command: 'start',
    description: 'Start the monitor server',
  })
  start(): void {
    const spin = createSpinner();
    spin.start('Starting monitor');

    let packetCount = 0;
    let distancePrevious = 0;
    let altitudePrevious = 0;

    const monitor = this.zwiftMemoryMonitor.monitor;

    monitor.on('data', (playerState: PlayerState) => {
      if (packetCount == 0 || playerState.distance < distancePrevious) {
        distancePrevious = playerState.distance;
        altitudePrevious = playerState.altitude;
      }

      if (packetCount > 4 && playerState.distance > distancePrevious + 3) {
        const angle = Math.asin(
          (playerState.altitude - altitudePrevious) / (200 * (playerState.distance - distancePrevious)),
        );

        const slopePercentage = 100 * Math.tan(angle) * 2;

        spin.info('Simulating ' + parseFloat(slopePercentage.toString()).toFixed(2) + '% incline');

        distancePrevious = playerState.distance;
        altitudePrevious = playerState.altitude;
        packetCount = 1;
      }

      packetCount = packetCount + 1;
    });

    monitor.once('ready', () => {
      try {
        monitor.start();

        spin.warn('warning: ' + monitor.lasterror);
      } catch (e) {
        spin.fail('error in monitor.start(): ' + monitor.lasterror);
      }
    });
  }
}
