import { Controller, UseGuards, Post, Request, Get } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { UserLoginDTO } from "../dto/user-login.dto";
import { JwtAuthGuard } from "../guard/jwt-auth.guard";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req:UserLoginDTO) {
      return this.authService.login((req as any).user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('is-authorized')
    async isAuthorized(@Request() req:UserLoginDTO) {
      return (req as any).user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}