# Microservices-Fiddle

Learning about microservices with nodejs + express and
handling intercommunication through RabbitMQ. Using an
api-gateway for external communication.

---

Users service waits for messages from the api-gateway.

POST payload to /user endpoint, users service receives it and
acknowledges it by logging a message to the server console.
