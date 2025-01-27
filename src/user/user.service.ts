import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}

    async findById(id){
        return this.prisma.user.findUnique({
            where: {id : id}
        })
    }

    async updateUser(id, newData){
        return this.prisma.user.update({
            where: {id: id},
            data: newData
        })
    }
}
