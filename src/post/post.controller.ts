import { Controller, Post } from '@nestjs/common';

import * as PostData from './schemas/post.schema';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createNewPost(): Promise<PostData.Post> {
    return await this.postService.createNewPost();
  }
}
