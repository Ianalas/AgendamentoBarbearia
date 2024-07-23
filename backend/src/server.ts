import fastify from "fastify";
import { UserController } from "./controller/UserController";

const server = fastify({ logger: true });

const userController = new UserController();

server.post("/register", userController.createUser);

server
  .listen({ port: 3000, host: "0.0.0.0" })
  .then(() => console.log("Servidor rodando !!!"))
  .catch((e) => {
    console.error(e);
  });
