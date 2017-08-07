const phase = process.argv[2] || 'development';
const config = require(`./config/${phase}.json`);
const keys = require(`./config/keys.json`);

function getQueues(queuePrefix, numQueue) {
    let queues = [];
    for (let i=0; i<numQueue; i+=1) {
        queues.push(`${queuePrefix}_${i}`);
    }
    return queues;
}

function putMsgToRedis(msg) {
    const redisClient = redis.createClient({
        host: 'localhost',
        retry_strategy: (options) => {
            if (options.attempt > 5) {
                return undefined;
            }

            return Math.min(options.attempt * 100, 1000);
        }
    });
    const chatMsg = JSON.parse(msg);

    redisClient.lpush(`c:${chatMsg.id}`, msg, (err, res) => {
        console.log(err, res);
        if (err === null) {
            connection.query('SELECT user_id FROM users_chats WHERE chat_id = ?', [chatMsg.id], (err, results, fields) => {
                if (err) {
                    throw err;
                }

                const userIds = results.map((result) => result.user_id).filter((userId) => userId != chatMsg.sender_id);
                connection.query('SELECT fcm_token FROM users WHERE id IN (?)', [userIds], (err, results, fields) => {
                    if (err) {
                        throw err;
                    }

                    results.map((result) => pushByFCM(result.fcm_token, chatMsg));
                });
            });
        }
    });
}

function pushByFCM(fcmToken, message) {
    console.log('fcmToken: ' + fcmToken);
    console.log('message: ' + message);

    request({
        url: config.fcm.url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `key=${keys.fcm}`,
        },
        json: true,
        body: {
            notification: {
                title: "메세지가 도착했습니다",
                body: message.msg.msg,
            },
            data: message,
            to: fcmToken,
        },
    }, (error, response, body) => {
        console.log(error);
        console.log(response.statusCode + " " + response.statusMessage);
        console.log(body);
    });
}

const amqp = require('amqplib');
const redis = require('redis');
const mysql = require('mysql');
const request = require('request');

const connection = mysql.createConnection(Object.assign(config.mysql, {
    password: process.env.MYSQL_ROOT_PASSWORD
}));

connection.connect();

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

// connection.end();