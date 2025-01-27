import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private jwtService: JwtService){}

    async register(login: string, passwrod: string, fullName: string){
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
        const year = today.getFullYear();
        const formattedDate = `${day}.${month}.${year}`;
        const hashedPasswortd = await bcrypt.hash(passwrod, 10);
        const user = await this.prisma.user.create({
            data: {
                login,
                password: hashedPasswortd,
                fullName,
                registrationDate: formattedDate
            }
        });
        return user;
    }

    async login(login: string, password: string){
        
        const user = this.prisma.user.findUnique({
            where: {login: login}
        })
        if(!user || !(await bcrypt.compare(password, (await user).password))){
            throw new Error('Invalid credentials')
        }
        const payload = {login: (await user).login, sub: (await user).id}
        return {
            access_token: this.jwtService.sign(payload),
            user: (await user)
        }
    }
}
