import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class FormattedArgs {
  format: string = 'd MMMM yyyy';
  persianNumbers: boolean = true;
}
