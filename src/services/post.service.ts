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

  async getPosts(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const { count, rows } = await this.postModel.findAndCountAll({
      offset,
      limit,
    });
    if (rows.length === 0) {
      return null;
    }
    const totalPages = Math.ceil(count / limit);
    return {
      posts: rows,
      currentPage: page,
      totalPages,
      pageSize: limit,
      total: count,
    };
  }
}
