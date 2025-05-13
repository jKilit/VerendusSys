import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UpdateResult {
  @Field()
  added: number;

  @Field()
  updated: number;
} 