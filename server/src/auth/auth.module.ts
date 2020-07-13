import * as path from "path";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { ConstantsEnum } from "./constants.enum";
import { databaseConfig } from "./config/database.config";
import { UsersService } from "./services/users.service";
import { UserEntity } from "./entities/user.entity";
import { UserRepository } from "./repository/user.repository";
import { GroupEntity } from "./entities/group.entity";
import { GroupRepository } from "./repository/group.repository";
import { ScopeEntity } from "./entities/scope.entity";
import { ScopeRepository } from "./repository/scope.repository";
import { RepositoryBase } from "../common/repository/repository.base";
import { AuthService } from "./services/auth.service";
import { I18nModule, I18nJsonParser } from "nestjs-i18n";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./services/local.strategy.service";
import { JwtModule } from "@nestjs/jwt";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { AuthController } from "./controllers/auth.controller";
import { JwtStrategy } from "./services/jwt-strategy.service";

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        process.env.NODE_ENV
          ? `src/auth/.env.${process.env.NODE_ENV}`
          : "src/auth/.env",
        ".env.default",
      ],
    }),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: process.env.JWT_EXPIRES },
      }),
    }),
    I18nModule.forRoot({
      fallbackLanguage: "en",
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, "/i18n/"),
        watch: true,
      },
    }),
    TypeOrmModule.forRoot({
      ...databaseConfig(),
      name: ConstantsEnum.connectionName,
    }),
    TypeOrmModule.forFeature(
      [
        UserEntity,
        UserRepository,
        GroupEntity,
        GroupRepository,
        ScopeEntity,
        ScopeRepository,
      ],
      ConstantsEnum.connectionName
    ),
  ],
  providers: [
    UsersService,
    UserRepository,
    GroupRepository,
    ScopeRepository,
    RepositoryBase,
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
  ],
  exports: [UsersService, AuthService, LocalStrategy],
})
export class AuthModule {
  constructor() {}
}
