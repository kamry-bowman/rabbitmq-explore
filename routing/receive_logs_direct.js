#!/usr/bin/env node

var amqp = require("amqplib/callback_api");
let args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
  process.exit(1);
}

amqp.connect("amqp://localhost", function(error0, connection) {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    let exchange = "direct_logs";

    channel.assertExchange(exchange, "direct", {
      durable: false
    });

    channel.assertQueue(
      "",
      {
        exclusive: true
      },
      (error2, q) => {
        if (error2) {
          throw error2;
        }
        console.log(
          ` [*] Waiting for messages in ${q.queue}. To exit press CTRL+C.`
        );

        args.forEach(severity => {
          channel.bindQueue(q.queue, exchange, severity);
        });

        channel.consume(
          q.queue,
          msg => {
            if (msg.content) {
              console.log(
                ` [x] ${msg.fields.routingKey}: ${msg.content.toString()}`
              );
            }
          },
          {
            noAck: true
          }
        );
      }
    );
  });
});
