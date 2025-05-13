import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Vehicle {
  @Field()
  identity: string;

  @Field()
  chassisNumber: string;

  @Field()
  modelYear: number;

  @Field()
  typeApprovalNumber: number;

  @Field()
  firstRegistration: string;

  @Field()
  privatelyImported: boolean;

  @Field({ nullable: true })
  deregisteredDate?: string;

  @Field()
  color: string;

  @Field()
  lastInspection: string;

  @Field()
  nextInspection: string;

  @Field()
  lastRegistration: string;

  @Field()
  monthlyRegistration: string;

  constructor(data: Partial<Vehicle>) {
    Object.assign(this, data);
  }
}
