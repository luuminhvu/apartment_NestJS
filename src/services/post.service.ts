import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Posts } from 'src/models/posts.model';
@Injectable()
export class postService {
  constructor(
    @InjectModel(Posts)
    private readonly postModel: typeof Posts,
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
