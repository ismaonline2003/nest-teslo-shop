import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/index';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { NotFoundError } from 'rxjs';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {
  }


  private _getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload)
    return token;
  }

  async createUser(CreateUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = CreateUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });
      await this.userRepository.save(user);
      delete user.password;
      delete user.isActive;
      return { 
        ...user, 
        token: this._getJwtToken({id: user.id})
      };

    } catch (error) {
      this._handleDBErrors(error);
    }
  }

  async loginUser(LoginUserDto: LoginUserDto) {
    const { password, email } = LoginUserDto;
    const user = await this.userRepository.findOne({ 
      where: { email },
      select: { id: true, fullName: true, email: true, password: true}
    })

    if(!user) {
      throw new UnauthorizedException("Credentials are not valid (email)");
    }
  
    if( !bcrypt.compareSync(password, user.password) ) {
      throw new UnauthorizedException("Credentials are not valid (password)");
    }

    const returnData = { 
      ...user, 
      token: this._getJwtToken({id: user.id})
    };
    delete returnData.password;

    return returnData;
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this._getJwtToken({id: user.id})
    }

  }


  private _handleDBErrors( error: any): never {

    if (error.code == '23505') {
      throw new BadRequestException(error.detail);
    }

    console.log(error);

    throw new InternalServerErrorException("Please check server logs");
  }
}
