import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { genHash } from './helper/hash.helper';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', async function (next) {
            const user = this;
            const hash = await genHash(this.password);
            if (hash) user.password = hash;
            next();
          });

          return schema;
        },
      },
    ]),
  ],

  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
