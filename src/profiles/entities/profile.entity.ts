import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Profile {
  @Field(() => Int, { description: 'Unique id of the profile' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [ProfileImage], {description: 'Profile Image'})
  @OneToMany(() => ProfileImage, (profileImg) => profileImg.profile)
  images: ProfileImage[];
}

@ObjectType()
@Entity()
export class ProfileImage {
  @Field(() => Int, {description: 'Unique id of profile image'})
  @PrimaryGeneratedColumn()
  id: number;

  @Field({description: 'Profile Image'})
  @Column()
  imageURL: string;

  @Field(() => Profile)
  @ManyToOne(() => Profile, (profile) => profile.images)
  profile: Profile;
}