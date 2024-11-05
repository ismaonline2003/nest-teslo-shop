import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

    @ApiProperty({
        example: "ismaonline2000@gmail.com",
        description: "User Email", 
        uniqueItems: true
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "admin1234",
        description: "User Password", 
        uniqueItems: true
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;
}