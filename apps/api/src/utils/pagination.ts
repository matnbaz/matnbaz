import { Type } from '@nestjs/common';
import { Directive, Field, ObjectType } from '@nestjs/graphql';

import { ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  // Forward pagination arguments
  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => String, { nullable: true })
  after?: string;

  // Backward pagination arguments
  @Field(() => Int, { nullable: true })
  last?: number;

  @Field(() => String, { nullable: true })
  before?: string;
}

@ObjectType({ description: 'Information about pagination in a connection.' })
export class PageInfo {
  @Field(() => Boolean, {
    description: 'Indicates if there are more pages to fetch.',
  })
  hasNextPage: boolean;

  @Field(() => Boolean, {
    description: 'Indicates if there are any pages prior to the current page.',
  })
  hasPreviousPage: boolean;

  @Field(() => String, {
    nullable: true,
    description: 'The cursor of the first edge in the connection.',
  })
  startCursor: string;

  @Field(() => String, {
    nullable: true,
    description: 'The cursor of the last edge in the connection.',
  })
  endCursor: string;
}

interface IEdgeType<TItem> {
  cursor: string;
  node: TItem;
}

export interface IPaginatedType<TItem> {
  edges: IEdgeType<TItem>[];
  pageInfo: PageInfo;
}

export function Paginated<TItem>(
  classRef: Type<TItem>
): Type<IPaginatedType<TItem>> {
  @ObjectType(`${classRef.name}Edge`, {
    description: `A ${classRef.name} edge.`,
  })
  abstract class EdgeType {
    @Field(() => String, { description: 'A cursor for use in pagination.' })
    cursor: string;

    @Field(() => classRef, {
      description: `The item at the end of ${classRef.name}Edge.`,
    })
    @Directive(`@cacheControl(inheritMaxAge: true)`)
    node: TItem;
  }

  @ObjectType({
    isAbstract: true,
    description:
      'An auto-generated type for paginating through multiple Publications.',
  })
  abstract class PaginatedType implements IPaginatedType<TItem> {
    @Field(() => [EdgeType], { nullable: true, description: 'A list of edges' })
    @Directive(`@cacheControl(inheritMaxAge: true)`)
    edges: EdgeType[];

    @Field(() => PageInfo, { description: 'Information to aid in pagination.' })
    @Directive(`@cacheControl(inheritMaxAge: true)`)
    pageInfo: PageInfo;
  }
  return PaginatedType as Type<IPaginatedType<TItem>>;
}