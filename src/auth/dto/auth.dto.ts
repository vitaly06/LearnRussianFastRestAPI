import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    login: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    fullName: string;

    @IsString()
    role: string;
}

export class LoginDto{
    @IsString()
    @IsNotEmpty()
    login: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}