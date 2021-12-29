import ExpressLoader from '@adminjs/express';
import { AdminModule as AdminJsModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/prisma';
import { BullModule, getQueueToken } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { UserType } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';
import AdminJS from 'adminjs';
import * as bcrypt from 'bcrypt';
import { Queue } from 'bull';
import { PrismaService } from 'nestjs-prisma';
import { GithubDiscovererModule } from '../github-discoverer/github-discoverer.module';
import { GithubExtractorModule } from '../github-extractor/github-extractor.module';
import { GITHUB_QUEUE, MAIN_QUEUE } from '../queue';
import { getResources } from './resources';

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    AdminJsModule.createAdminAsync({
      imports: [
        GithubExtractorModule,
        GithubDiscovererModule,
        BullModule.registerQueue({ name: MAIN_QUEUE }),
        BullModule.registerQueue({ name: GITHUB_QUEUE }),
      ],
      inject: [
        PrismaService,
        ModuleRef,
        getQueueToken(MAIN_QUEUE),
        getQueueToken(GITHUB_QUEUE),
      ],
      useFactory: (
        prisma: PrismaService,
        _,
        mainQueue: Queue,
        githubQueue: Queue
      ) => {
        const dmmf = (prisma as any)._dmmf as DMMFClass;

        return {
          auth: {
            cookieName: 'admin_auth_cookie',
            cookiePassword: process.env.ADMIN_COOKIE_SECRET,
            authenticate: async (email, password) => {
              const user = await prisma.user.findUnique({ where: { email } });
              if (
                !user ||
                !(
                  user.type === UserType.Admin ||
                  user.type === UserType.Moderator
                )
              )
                return null;
              return bcrypt.compareSync(password, user.password)
                ? { ...user, title: user.name }
                : null;
            },
          },
          adminJsOptions: {
            rootPath: '/admin',
            branding: {
              companyName: 'Matnbaz Admin Panel',
              logo: '',
              softwareBrothers: false,
            },
            resources: getResources({
              dmmf,
              prisma,
              queues: {
                main: mainQueue,
                github: githubQueue,
              },
            }),
          },
          customLoader: ExpressLoader,
        };
      },
    }),
  ],
})
export class AdminModule {}
