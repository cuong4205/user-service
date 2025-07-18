import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class NotificationProducer {
  constructor(@Inject('KAFKA_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('send.email');
    await this.client.connect();
    console.log('VideoProducer initialized');
  }

  emitSendEmail(addr: string, message: string) {
    this.client.emit('send.email', { addr, message });
    console.log('Send email to:', addr);
  }
}
