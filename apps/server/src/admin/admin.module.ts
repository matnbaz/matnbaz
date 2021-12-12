import ExpressLoader from '@adminjs/express';
import { AdminModule as AdminJsModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/prisma';
import { Module } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';
import AdminJS from 'adminjs';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'nestjs-prisma';
import { getResources } from './resources';

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    AdminJsModule.createAdminAsync({
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => {
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
              companyName: 'Iran FOSS Admin Panel',
              logo: '',
              softwareBrothers: false,
            },
            resources: getResources({ dmmf, prisma }),
          },
          customLoader: ExpressLoader,
        };
      },
    }),
  ],
})
export class AdminModule {}
