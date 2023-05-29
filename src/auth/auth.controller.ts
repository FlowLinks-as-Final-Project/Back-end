import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from 'src/user/schemas/user.schema';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('auth/signin')
    async signIn(@Request() req) {
        return this.authService.signIn(req.user);
    }
}