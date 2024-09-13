import { Body, Controller, Res } from '@nestjs/common';
import { postService } from 'src/services/post.service';
import { Post } from '@nestjs/common';
import { SuccessResponse } from 'src/common/response';
import { Response } from 'express';
@Controller('post')
export class PostController {
  constructor(private readonly postService: postService) {}
  @Post('create')
  async createPost(
    @Body() body: { title: string; content: string; userId: number },
    @Res() res: Response,
  ) {
    const post = await this.postService.createPost(
      body.title,
      body.content,
      body.userId,
    );
    return SuccessResponse(res, post, 'Post created successfully');
  }
}
