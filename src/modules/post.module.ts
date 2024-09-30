import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostController } from 'src/controllers/post.controller';
import { Posts } from 'src/models/posts.model';
import { User } from 'src/models/user.model';
import { postService } from 'src/services/post.service';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [SequelizeModule.forFeature([Posts, User])],
  controllers: [PostController],
  providers: [postService, UserService],
  exports: [postService],
})
export class PostModule {}
