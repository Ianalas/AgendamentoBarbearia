import { UserRepository } from "../repository/UserRepository";
import { hash } from "bcrypt";
import { IUserData } from "../schemas/user-schema";

export class UserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository) {
    this.userRepository = repository;
  }

  async createUser(data: IUserData) {
    const passwordHashed = await hash(data.password, 8);

    const createUserData = {
      ...data,
      password: passwordHashed,
    };

    return await this.userRepository.create(createUserData);
  }
}
