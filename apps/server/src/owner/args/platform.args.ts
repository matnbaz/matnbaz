import { ArgsType, Field } from '@nestjs/graphql';
import { PlatformType } from '../../models/enums/platform-type.enum';

@ArgsType()
export class PlatformArgs {
  owner: string;

  @Field(() => PlatformType)
  platform: PlatformType;
}
