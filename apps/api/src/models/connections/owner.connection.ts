import { Paginated } from '../../utils/pagination';
import { ObjectType } from '@nestjs/graphql';
import { Owner, OwnerOrganization, OwnerUser } from '../owner.model';

@ObjectType()
export class OwnerConnection extends Paginated(Owner) {}

@ObjectType()
export class OwnerUserConnection extends Paginated(OwnerUser) {}

@ObjectType()
export class OwnerOrganizationConnection extends Paginated(OwnerOrganization) {}
