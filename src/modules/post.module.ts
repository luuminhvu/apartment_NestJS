import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostController } from 'src/controllers/post.controller';
import { Posts } from 'src/models/posts.model';
import { postService } from 'src/services/post.service';

@Module({
  imports: [SequelizeModule.forFeature([Posts])],
  controllers: [PostController],
  providers: [postService],
  exports: [postService],
})
export class PostModule {}
