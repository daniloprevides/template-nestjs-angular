import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { I18nService } from "nestjs-i18n";
import { JwtService } from '@nestjs/jwt';
import { UserInfoDTO } from "../dto/user-info.dto";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly i18n: I18nService,
    private readonly jwtService: JwtService

  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneUserByName(username);
    if (!user) {
      throw new NotFoundException(
        await this.i18n.translate("USER_NOT_FOUND", {
          args: { username: username },
        })
      );
    }

    if (!user.validPassword(pass)) {
      throw new NotFoundException(
        await this.i18n.translate("USER_NOT_FOUND", {
          args: { username: username },
        })
      );
    }

    return user;
  }

  async login(user: UserEntity) : Promise<UserInfoDTO> {
    const scopes = [];
    user.groups?.forEach(g => g.scopes.forEach(s => scopes.push(s.name)));
    const payload = { username: user.email, sub: user.id, scopes: scopes };
    return {
      username: user.email,
      access_token: this.jwtService.sign(payload),
      scopes: scopes
    } as UserInfoDTO;
  }

}
