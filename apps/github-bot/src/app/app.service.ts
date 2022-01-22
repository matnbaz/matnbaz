import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OctokitService } from 'nestjs-octokit';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly octokit: OctokitService
  ) {}

  private logger = new Logger(AppService.name);

  @Cron(CronExpression.EVERY_DAY_AT_8PM)
  async followOwners() {
    const owners = await this.prisma.owner.findMany({
      where: { platform: 'GitHub', blockedAt: null, type: 'User' },
    });
    const ownerLogins = owners.map((owner) => owner.login);

    const followings = await this.getFollowings();
    const followingLogins = followings.map((following) => following.login);

    const toUnfollow = followings
      .filter((following) => !ownerLogins.includes(following.login))
      .map((following) => following.login);
    const toFollow = ownerLogins.filter(
      (login) => !followingLogins.includes(login)
    );

    for (const login of toUnfollow) {
      try {
        await this.octokit.rest.users.unfollow({
          username: login,
        });
      } catch (e) {
        this.logger.warn(`Error occurred when unfollowing ${login}. ${e}`);
      }
    }

    for (const login of toFollow) {
      try {
        await this.octokit.rest.users.follow({
          username: login,
          request: { timeout: 5000 },
        });
      } catch (e) {
        this.logger.warn(`Error occurred when following ${login}. ${e}`);
      }
    }
  }

  async getFollowings() {
    let finished = false;
    let page = 1;
    const followingsList: Awaited<
      ReturnType<
        OctokitService['rest']['users']['listFollowedByAuthenticatedUser']
      >
    >['data'][0][] = [];
    while (!finished) {
      try {
        const response =
          await this.octokit.rest.users.listFollowedByAuthenticatedUser({
            per_page: 100,
            page,
          });
        followingsList.push(...response.data);
        if (response.data.length < 100) {
          finished = true;
        }
        page++;
      } catch (e) {
        finished = true;
      }
    }
    return followingsList;
  }
}
