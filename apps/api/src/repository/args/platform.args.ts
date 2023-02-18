import { ArgsType, Field } from '@nestjs/graphql';
import { PlatformType } from '../../models/enums/platform-type.enum';

@ArgsType()
export class PlatformArgs {
  @Field(() => String)
  repo: string;
  @Field(() => String)
  owner: string;

  @Field(() => PlatformType)
  platform: PlatformType;
}
