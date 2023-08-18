import {Controller, Get, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {Request} from "express";
import {GetUser} from "../auth/decorator";
import {User} from "@prisma/client";
import {UserService} from "./user.service";
import {JwtGuard} from "../auth/guard";


@UseGuards (JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {
    }
    @Get('me')
    getMe(@GetUser() user: User){
        // console.log({
        //     user: req.user,
        // })
        return user;
    }

    @Post('sendEmail')
    sendEmail(@GetUser('id') userId: number){
        return this.userService.sendEmail(userId);
    }

    @Get('stats')
    getStats(){
        return this.userService.getStats();

    }




}