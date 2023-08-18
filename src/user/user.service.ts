import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {
    }

    async sendEmail(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: {id: userId},
        });
        if (!user) {
            throw new Error(`User with ID: ${userId} not found.`);
        }

        const updatedEmailAmountPerDay = user.emailAmountPerDay + 1;

        return this.prisma.user.update({
            where: {id: userId},
            data: {
                emailAmountPerDay: updatedEmailAmountPerDay,
            },
        });


    }
    async getStats(){
        const users= await this.prisma.user.findMany({
            where: {emailAmountPerDay: {gt: 0}},
        });
        for (const user of users) {
            delete user.hash;
        }
        return users;
    }
}
