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

    let packetCount = 0;
    let distancePrevious = 0;
    let altitudePrevious = 0;

    const monitor = this.zwiftPacketMonitor.monitor;
    monitor.on('outgoingPlayerState', (playerState) => {
      if (packetCount == 0 || playerState.distance < distancePrevious) {
        distancePrevious = playerState.distance;
        altitudePrevious = playerState.altitude;
      }

      if (packetCount > 4 && playerState.distance > distancePrevious + 3) {
        const angle = Math.asin(
          (playerState.altitude - altitudePrevious) /
            (200 * (playerState.distance - distancePrevious)),
        );

        const slopePercentage = 100 * Math.tan(angle);

        spin.info(
          'Simulating ' +
            parseFloat(slopePercentage.toString()).toFixed(2) +
            '% incline pckt ' +
            packetCount,
        );

        distancePrevious = playerState.distance;
        altitudePrevious = playerState.altitude;
        packetCount = 1;
      }

      packetCount = packetCount + 1;
    });

    monitor.start();
  }
}
