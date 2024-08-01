import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { saltOrRounds } from "./constants";

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { }

  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(email);
    if ((!user) || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async register(email: string, password: string, confirmPassword: string): Promise<{ access_token: string }> {
    const checkUser = await this.userService.findOne(email);
    if (checkUser) {
      throw new ConflictException("User already exists");
    }
    if (password !== confirmPassword) {
      throw new BadRequestException("Passwords does not match");
    }
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const user = await this.userService.create(email, hashedPassword);
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
