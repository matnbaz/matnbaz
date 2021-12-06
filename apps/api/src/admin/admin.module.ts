import ExpressLoader from '@adminjs/express';
import { AdminModule as AdminJsModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/prisma';
import { Module } from '@nestjs/common';
import { DMMFClass } from '@prisma/client/runtime';
import AdminJS, {
  NotFoundError,
  ResourceWithOptions,
  ValidationError,
} from 'adminjs';
import { PrismaService } from 'nestjs-prisma';

AdminJS.registerAdapter({ Database, Resource });
const block = {
  name: 'block',
  isVisible: true,
  actionType: 'record',
  icon: 'Error',
  component: false,
  variant: 'danger',
  handler: async (request, response, data) => {
    const { record, resource, currentAdmin, h } = data;
    if (!request.params.recordId || !record) {
      throw new NotFoundError(
        ['You have to pass "recordId" to Block Action'].join('\n'),
        'Action#handler'
      );
    }
    try {
      await resource.update(request.params.recordId, {
        blockedAt: new Date(),
      });
    } catch (error) {
      if (error instanceof ValidationError && error.baseError) {
        return {
          record: record.toJSON(currentAdmin),
          notice: {
            message: error.baseError.message,
            type: 'error',
          },
        };
      }
      throw error;
    }
    return {
      record: record.toJSON(currentAdmin),
      redirectUrl: h.resourceUrl({
        resourceId: resource._decorated?.id() || resource.id(),
      }),
      notice: {
        message: 'Successfully blocked.',
        type: 'success',
      },
    };
  },
};

const unblock = {
  name: 'unblock',
  isVisible: true,
  actionType: 'record',
  icon: 'Checkmark',
  component: false,
  variant: 'success',
  handler: async (request, response, data) => {
    const { record, resource, currentAdmin, h } = data;
    if (!request.params.recordId || !record) {
      throw new NotFoundError(
        ['You have to pass "recordId" to Unblock Action'].join('\n'),
        'Action#handler'
      );
    }
    try {
      await resource.update(request.params.recordId, {
        blockedAt: null,
      });
    } catch (error) {
      if (error instanceof ValidationError && error.baseError) {
        return {
          record: record.toJSON(currentAdmin),
          notice: {
            message: error.baseError.message,
            type: 'error',
          },
        };
      }
      throw error;
    }
    return {
      record: record.toJSON(currentAdmin),
      redirectUrl: h.resourceUrl({
        resourceId: resource._decorated?.id() || resource.id(),
      }),
      notice: {
        message: 'Successfully unblocked.',
        type: 'success',
      },
    };
  },
};

const bulkBlock = {
  name: 'bulkBlock',
  isVisible: true,
  actionType: 'bulk',
  icon: 'Error',
  showInDrawer: true,
  variant: 'danger',
  handler: async (request, response, context) => {
    const { records, resource, h } = context;
    if (!records || !records.length) {
      throw new NotFoundError('no records were selected.', 'Action#handler');
    }
    if (request.method === 'get') {
      const recordsInJSON = records.map((record) =>
        record.toJSON(context.currentAdmin)
      );
      return {
        records: recordsInJSON,
      };
    }
    if (request.method === 'post') {
      await Promise.all(
        records.map((record) =>
          resource.update(record.id(), { blockedAt: new Date() })
        )
      );
      return {
        records: records.map((record) => record.toJSON(context.currentAdmin)),
        notice: {
          message: `Successfully blocked ${records.length} records.`,
          type: 'success',
        },
        redirectUrl: h.resourceUrl({
          resourceId: resource._decorated?.id() || resource.id(),
        }),
      };
    }
    throw new Error('method should be either "post" or "get"');
  },
};

const bulkUnblock = {
  name: 'bulkUnblock',
  isVisible: true,
  actionType: 'bulk',
  icon: 'Checkmark',
  showInDrawer: true,
  variant: 'success',
  handler: async (request, response, context) => {
    const { records, resource, h } = context;
    if (!records || !records.length) {
      throw new NotFoundError('no records were selected.', 'Action#handler');
    }
    if (request.method === 'get') {
      const recordsInJSON = records.map((record) =>
        record.toJSON(context.currentAdmin)
      );
      return {
        records: recordsInJSON,
      };
    }
    if (request.method === 'post') {
      await Promise.all(
        records.map((record) =>
          resource.update(record.id(), { blockedAt: null })
        )
      );
      return {
        records: records.map((record) => record.toJSON(context.currentAdmin)),
        notice: {
          message: `Successfully blocked ${records.length} records.`,
          type: 'success',
        },
        redirectUrl: h.resourceUrl({
          resourceId: resource._decorated?.id() || resource.id(),
        }),
      };
    }
    throw new Error('method should be either "post" or "get"');
  },
};

@Module({
  imports: [
    AdminJsModule.createAdminAsync({
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => {
        const dmmf = (prisma as any)._dmmf as DMMFClass;
        return {
          adminJsOptions: {
            rootPath: '/admin',
            branding: {
              companyName: 'Iran FOSS Admin Panel',
              logo: '',
              softwareBrothers: false,
            },
            resources: [
              {
                resource: {
                  model: dmmf.modelMap.Repository,
                  client: prisma,
                },
                options: {
                  actions: {
                    block,
                    unblock,
                    bulkBlock,
                    bulkUnblock,
                  },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.Owner,
                  client: prisma,
                },
                options: {
                  actions: {
                    block,
                    unblock,
                    bulkBlock,
                    bulkUnblock,
                  },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.Report,
                  client: prisma,
                },
                options: {},
              },
              {
                resource: {
                  model: dmmf.modelMap.Submission,
                  client: prisma,
                },
                options: {},
              },
              {
                resource: {
                  model: dmmf.modelMap.Language,
                  client: prisma,
                },
                options: {},
              },
              {
                resource: {
                  model: dmmf.modelMap.Topic,
                  client: prisma,
                },
                options: {},
              },
              {
                resource: {
                  model: dmmf.modelMap.License,
                  client: prisma,
                },
                options: {},
              },
            ] as ResourceWithOptions[],
          },
          customLoader: ExpressLoader,

          // auth: {
          //   authenticate: async (email, password) =>
          //     Promise.resolve({ email: 'test' }),
          //   cookieName: 'test',
          //   cookiePassword: 'testPass',
          // },
        };
      },
    }),
  ],
})
export class AdminModule {}
