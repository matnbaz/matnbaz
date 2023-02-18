import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../utils/pagination';
import { License } from '../license.model';

@ObjectType()
export class LicenseConnection extends Paginated(License) {}
