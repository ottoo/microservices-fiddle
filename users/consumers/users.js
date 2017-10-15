const amqplib = require('amqplib');
const debug = require('debug')('users:consumers');

const QUEUE_NAME = 'users';

const readUserMessages = () => {
  amqplib.connect('amqp://rabbitmq:rabbitmq@localhost:5672/rabbit_node_1')
    .then(conn => {
      return conn.createChannel().then(ch => {
        var ok = ch.assertQueue(QUEUE_NAME, { durable: false });

        // Queue exist, read messages from it.
        ok = ok.then(res => {
          return ch.consume(QUEUE_NAME, msg => {
            debug('Received message', msg.content.toString());
          }, { noAck: true });
        });

        return ok.then(() => {
          debug('Waiting for messages..');
        });
      })
    }).catch(console.warn);
};

module.exports = {
  readUserMessages
};
