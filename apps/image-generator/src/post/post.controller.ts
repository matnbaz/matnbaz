import { Controller, Get, Query, Render, Res } from '@nestjs/common';
import { PostImageOptions, PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  @Render('index')
  generatorHtml() {
    return {};
  }

  @Get('/generate')
  async postEndpoint(@Query() options: PostImageOptions, @Res() response) {
    const image = await this.postService.render(options);
    response.setHeader('Content-Type', 'image/jpeg');
    const buffer = Buffer.from(image as string, 'base64');
    response.send(buffer);
  }
}
