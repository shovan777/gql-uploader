import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Profile {
  @Field(() => Int, { description: 'Unique id of the profile' })
  @PrimaryGeneratedColumn()
  id: number;
}
