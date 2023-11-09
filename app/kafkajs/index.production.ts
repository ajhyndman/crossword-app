import throttle from 'lodash.throttle';
import { getKafkaClient } from './client';
import { Log } from './log';
import type { KafkaMessage, Message } from 'kafkajs';

let init: Promise<Log<KafkaMessage>>;
let MESSAGE_QUEUE: Message[] = [];

const flushMessages = throttle(async () => {
  const { producer } = await getKafkaClient();
  const messages = MESSAGE_QUEUE;
  MESSAGE_QUEUE = [];
  await producer.send({ topic: 'crossword-actions', messages });
}, 10);

export async function dispatch(key: string, action: any) {
  MESSAGE_QUEUE.push({ key, value: JSON.stringify(action) });
  flushMessages();
}

export async function getMessageLog() {
  if (init) return init;

  init = new Promise(async (resolve) => {
    const messageLog = new Log<KafkaMessage>();
    const { consumer } = await getKafkaClient();

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        messageLog.push(message);
      },
    });
    await consumer.seek({ topic: 'crossword-actions', partition: 0, offset: '0' });

    resolve(messageLog);

    console.info('kafkajs :: local log populated');
  });

  return init;
}