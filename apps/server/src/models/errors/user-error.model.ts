import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserError {
  message: string;
  path?: string[];
}
