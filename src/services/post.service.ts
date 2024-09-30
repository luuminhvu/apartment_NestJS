import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Posts } from 'src/models/posts.model';
import { UserService } from './user.service';
@Injectable()
export class postService {
  constructor(
    @InjectModel(Posts)
    private readonly postModel: typeof Posts,
    private readonly UserService: UserService,
  ) {}

  async createPost(
    title: string,
    content: string,
    userId: number,
  ): Promise<Posts> {
    const post = await this.postModel.create({ title, content, userId });
    return post;
  }
}
