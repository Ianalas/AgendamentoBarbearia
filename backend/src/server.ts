import fastify from "fastify";
import { UserController } from "./controller/UserController";
import { UserService } from "./service/UserService";
import { UserRepository } from "./repository/UserRepository";
import { UserValidate } from "./validation/UserValidate";

const server = fastify({ logger: true });

const userRepository = new UserRepository();
const userValidate = new UserValidate();

const userService = new UserService(userRepository);
const userController = new UserController(userService, userValidate);

server.post("/register", userController.createUser.bind(userController));

server
  .listen({ port: 3000, host: "0.0.0.0" })
  .then(() => console.log("Server is running ⚡⚡⚡⚡"))
  .catch((e) => {
    console.error(e);
  });
