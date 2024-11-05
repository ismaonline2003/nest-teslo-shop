import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Headers, SetMetadata, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/index';
import { AuthGuard } from '@nestjs/passport';
import { GetUser, RawHeaders } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { Auth } from './decorators';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: "The user had been registered in succesfully", example: {
    "email": "user2@gmail.com",
    "fullName": "User Name Two",
    "id": "d655b625-98e0-42a1-b689-06e16222992e",
    "roles": [
        "user"
    ],
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2NTViNjI1LTk4ZTAtNDJhMS1iNjg5LTA2ZTE2MjIyOTkyZSIsImlhdCI6MTczMDc3OTc1OSwiZXhwIjoxNzMwNzg2OTU5fQ.xbU2a4qBGBZC-lA2DPLq-8ANZEEcf7-T5efRD8RtkzI"
  }})
  @ApiResponse({ status: 400, description: "Bad Request"})
  @ApiResponse({ status: 403, description: "Forbidden. Token Related."})
  @ApiResponse({ status: 500, description: "Internal Server Error."})
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.createUser(CreateUserDto);
  }

  @Post('login')
  @ApiResponse({ status: 201, description: "The user had been logged in succesfully", example: {
    "id": "7c83fd07-5088-4066-b58b-a606f7a29974",
    "email": "superUser@gmail.com",
    "fullName": "Ismael Castillo",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdjODNmZDA3LTUwODgtNDA2Ni1iNThiLWE2MDZmN2EyOTk3NCIsImlhdCI6MTczMDc3OTcyNCwiZXhwIjoxNzMwNzg2OTI0fQ.VSvSKNx2Jezp-XjWOGJlojEgbwH-vumxDVTWSjeGco8"
  }})
  @ApiResponse({ status: 400, description: "Bad Request"})
  @ApiResponse({ status: 403, description: "Forbidden. Token Related."})
  @ApiResponse({ status: 404, description: "User not Found"})
  @ApiResponse({ status: 500, description: "Internal Server Error."})
  loginUser(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.loginUser(LoginUserDto);
  }

  
  @ApiResponse({ status: 201, description: "The is checked", example: {
    "id": "7c83fd07-5088-4066-b58b-a606f7a29974",
    "email": "superUser@gmail.com",
    "fullName": "Ismael Castillo",
    "isActive": true,
    "roles": [
        "super-user"
    ],
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdjODNmZDA3LTUwODgtNDA2Ni1iNThiLWE2MDZmN2EyOTk3NCIsImlhdCI6MTczMDc3OTg0OSwiZXhwIjoxNzMwNzg3MDQ5fQ.yVuXae8BB5JvMq2Odi4kITyyoorQlRlvcgXVnfzAyj0"
  }})
  @ApiResponse({ status: 400, description: "Bad Request"})
  @ApiResponse({ status: 403, description: "Forbidden. Token Related."})
  @ApiResponse({ status: 404, description: "User not Found"})
  @ApiResponse({ status: 500, description: "Internal Server Error."})
  @Get('check-auth-status')
  @Auth()
  checkAuthSttaus(
    @GetUser() user: User,
  ) {
    return this.authService.checkAuthStatus(user);
  }

/*
  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateRoute(
    //@Req() request: Express.Request
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders
  ) {
    return {
      ok: true,
      message: "Hola Mundo Private",
      user,
      userEmail,
      rawHeaders,
      headers
    }
  }

  //@SetMetadata('roles', ['admin', 'super-user'])
  @Get('private2')
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards( AuthGuard(), UserRoleGuard )
  privateRoute2(
    @GetUser() user: User
  ) {
    return {
      ok: true,
      user
    }
  }

    @Get('private3')
    @Auth(ValidRoles.superUser)
    privateRoute3(
      @GetUser() user: User
    ) {
      return {
        ok: true,
        user
      }
    }
      */
}
