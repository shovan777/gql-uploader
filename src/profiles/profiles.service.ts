import { Injectable } from '@nestjs/common';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, ProfileImage } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profileRepo: Repository<Profile>,
    @InjectRepository(ProfileImage)
    private profileImageRepo: Repository<ProfileImage>,
  ) {}
  create(createProfileInput: CreateProfileInput) {
    console.log(createProfileInput);
    return 'This action adds a new profile';
  }

  findAll(): Promise<Profile[]> {
    return this.profileRepo.find({
      relations: {
        images: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileInput: UpdateProfileInput) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
