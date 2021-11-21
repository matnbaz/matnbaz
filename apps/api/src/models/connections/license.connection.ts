import { Paginated } from '@exonest/graphql-connections';
import { ObjectType } from '@nestjs/graphql';
import { License } from '../license.model';

@ObjectType()
export class LicenseConnection extends Paginated(License) {}
