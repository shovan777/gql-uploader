import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Profile {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
