import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async genToken(payload: any) {
    return await sign(payload, 'shhhhh');
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new this.userModel(createUserDto);
      const userExist = await this.userModel.exists({
        username: createUserDto.username,
      });
      if (userExist) {
        return new ConflictException();
      }
      const savedUser = await user.save();

      return {
        accessToken: await this.genToken({ id: savedUser.id }),
      };
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    const usersList = await this.userModel.find({}, '-password');
    return usersList;
  }

  async findOne(id: number) {
    try {
      const user = await this.userModel.findById(id, '-password');

      return user;
    } catch (err) {}
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
