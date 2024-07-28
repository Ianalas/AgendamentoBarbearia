import { UserRepository } from "../repository/UserRepository";
import { hash } from "bcrypt";
import { IUserData } from "../schemas/user-schema";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: IUserData): Promise<{ id: string }> {
    const passwordHashed = await hash(data.password, 8);

    const createUserData = {
      ...data,
      password: passwordHashed,
    };

    return this.userRepository.create(createUserData);
  }
}
