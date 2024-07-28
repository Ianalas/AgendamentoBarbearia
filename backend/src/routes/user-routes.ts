import { FastifyInstance } from "fastify";
import { UserRepository } from "../repository/UserRepository";
import { UserValidate } from "../validation/UserValidate";
import { UserService } from "../service/UserService";
import { UserController } from "../controller/UserController";

export async function userRoutes(server: FastifyInstance) {
  const userRepository = new UserRepository();
  const userValidate = new UserValidate(userRepository);

  const userService = new UserService(userRepository);
  const userController = new UserController(userService, userValidate);

  server.post("/register", userController.createUser.bind(userController));
}
