import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import LoginDto from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor() {}
  async login(params: LoginDto) {}
}
