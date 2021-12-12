import { Field, ObjectType } from '@nestjs/graphql';
import { ReportableType } from './enums/reportable-type.enum';
import { Node } from './node.model';

@ObjectType({ implements: [Node] })
export class Report {
  reason: string;

  @Field(() => ReportableType)
  reportableType: ReportableType;
}
