import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "./prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private prisma: PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            passReqToCallback: true
        });
    }

    async validate(payload: any){
        return {userId: payload.sub, login: payload.login}
    }
}