import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class DifferenceArgs {
  persianNumbers: boolean = true;
}
