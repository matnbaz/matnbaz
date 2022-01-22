import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { throttling } from '@octokit/plugin-throttling';
import { OctokitModule } from 'nestjs-octokit';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    OctokitModule.forRoot({
      isGlobal: true,
      octokitOptions: {
        auth: process.env.GITHUB_BOT_TOKEN,
        plugins: [throttling],
        throttle: {
          onRateLimit: (retryAfter, options, octokit) => {
            octokit.log.warn(
              `Request quota exhausted for request ${options.method} ${options.url}`
            );

            octokit.log.info(`Retrying after ${retryAfter} seconds!`);
            return true;
          },
          onAbuseLimit: (retryAfter, options, octokit) => {
            // does not retry, only logs a warning
            octokit.log.warn(
              `Abuse detected for request ${options.method} ${options.url}`
            );
          },
        },
      },
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
