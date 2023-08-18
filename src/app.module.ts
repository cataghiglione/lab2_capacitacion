import { Module } from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import { UserModule } from './user/user.module';
import {AuthController} from "./auth/auth.controller";
import {AuthService} from "./auth/auth.service";
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import {ConfigModule} from "@nestjs/config";


@Module({
  imports: [AuthModule, UserModule, PrismaModule, ConfigModule.forRoot({isGlobal: true})],

})
export class AppModule {}
