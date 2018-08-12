const express = require("express");
const router = express.Router();
const debug = require("debug")("api-gateway:routes");

const amqplib = require("amqplib");

const QUEUE_NAME = "users";

router.get("/", function(req, res, next) {
  res.json({ message: "ok" });
});

router.post("/user", function(req, res, next) {
  amqplib
    .connect("amqp://rabbitmq:rabbitmq@localhost:5672/rabbit_node_1")
    .then(conn => {
      return conn
        .createChannel()
        .then(ch => {
          const ok = ch.assertQueue(QUEUE_NAME, { durable: false });

          // Queue exist, send a message to it.
          return ok.then(res => {
            ch.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(req.body)));
            debug("Sent message to the queue", QUEUE_NAME);
            return ch.close();
          });
        })
        .finally(() => conn.close());
    })
    .catch(console.warn);

  res.json({ message: "ok" });
});

module.exports = router;
