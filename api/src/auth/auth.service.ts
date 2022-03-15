import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { UserService } from 'src/modules/user/user.service';
import { comparePassword } from 'src/utils/password';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await this.userService.findByEmail(email);
    if (await comparePassword(password, user.passwordHash)) {
      return user;
    }
    return null;
  }

  async login(user: IUser) {
    const { _id, email, role } = user;
    const payload = { _id, email, role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
