import { Module } from '@nestjs/common';
import { OwnerOrganizationResolver } from './owner-organization.resolver';
import { OwnerUserResolver } from './owner-user.resolver';
import { OwnerResolver } from './owner.resolver';

@Module({
  providers: [OwnerResolver, OwnerOrganizationResolver, OwnerUserResolver],
})
export class OwnerModule {}
