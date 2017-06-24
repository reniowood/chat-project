const phase = process.argv[2] || 'development';
const config = require(`./config/${phase}.json`);

function getQueues(queuePrefix, numQueue) {
    let queues = [];
    for (let i=0; i<numQueue; i+=1) {
        queues.push(`${queuePrefix}_${i}`);
    }
    return queues;
}

function putMsgToRedis(msg) {
    const chatMsg = JSON.parse(msg);
    redisClient.lpush(`c:${chatMsg.id}`, msg);
}

const amqp = require('amqplib');
const redis = require('redis');
const redisClient = redis.createClient();

amqp.connect(config.rabbitmq.host).then((connection) => {
    connection.createChannel().then((channel) => {
        const queues = getQueues(config.rabbitmq.queuePrefix, config.rabbitmq.numQueue);

        queues.map((queue) => {
            channel.assertQueue(queue, {durable: true});
            console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);
            channel.consume(queue, (message) => {
                console.log(`${queue} received ${message.content.toString()}`);
                putMsgToRedis(message.content);
                channel.ack(message);
            });
        });
    }, (err) => {
        console.log(`Creating channel failed - ${err}`);
    });
}, (err) => {
    console.log(`Connection failed - ${err}`);
});
