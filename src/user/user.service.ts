import { Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { User as UserEntity } from "../entities/user.entity";
import { randomUUID } from "crypto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

  async findOne(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) return null;
    return user;
  }

  async create(email: string, password: string) {
    const user = this.userRepository.create({ id: randomUUID(), email, password });
    await this.userRepository.save(user);
    return user;
  }
}
