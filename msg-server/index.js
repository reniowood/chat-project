const phase = process.argv[2] || 'development';
const config = require(`./config/${phase}.json`);

function getQueues(queuePrefix, numQueue) {
    let queues = [];
    for (let i=0; i<numQueue; i+=1) {
        queues.push(`${queuePrefix}_${i}`);
    }
    return queues;
}

const amqp = require('amqplib/callback_api');

amqp.connect(config.rabbitmq.host, (err, connection) => {
    connection.createChannel((err, channel) => {
        const queues = getQueues(config.rabbitmq.queuePrefix, config.rabbitmq.numQueue);

        queues.map((queue) => {
            channel.assertQueue(queue, {durable: true});
            console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);
            channel.consume(queue, (message) => {
                console.log(`${queue} received ${message.content.toString()}`);
                channel.ack(message);
            });
        });
    });
});
