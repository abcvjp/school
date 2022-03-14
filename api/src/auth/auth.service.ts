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
      const { passwordHash, ...result } = user; // eslint-disable-line
      return result;
    }
    return null;
  }

  async login(user: IUser) {
    const payload = { sub: user._id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
