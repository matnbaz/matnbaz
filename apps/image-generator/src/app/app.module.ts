import { Module } from '@nestjs/common';
import { PostModule } from '../post/post.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
