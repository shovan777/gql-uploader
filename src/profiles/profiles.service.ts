import { Injectable } from '@nestjs/common';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, ProfileImage } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { join } from 'path';
import { uploadFileStream } from 'src/utils/upload';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profileRepo: Repository<Profile>,
    @InjectRepository(ProfileImage)
    private profileImageRepo: Repository<ProfileImage>,
  ) {}
  // you should probably read this from env in production
  uploadDir = 'uploads';
  async create(createProfileInput: CreateProfileInput): Promise<Profile> {
    let profileInputData = {
      ...createProfileInput,
      images: null,
    };
    const profileData: Profile = await this.profileRepo.save({
      ...profileInputData,
    });
    const imagePaths = createProfileInput.images.map(async (image, index) => {
      const imageFile: any = await image;
      const fileName = `${Date.now()}_${index}_${imageFile.filename}`;
      const uploadDir = join(
        this.uploadDir,
        `profiles_${profileData.id}`,
        'images',
      );
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        uploadDir,
        fileName,
      );
      return filePath;
    });
    const profileImages: Promise<ProfileImage>[] = imagePaths.map(
      async (imagePath) => {
        return await this.profileImageRepo.save({
          imageURL: await imagePath,
          profile: profileData,
        });
      },
    );
    profileInputData = {
      ...profileInputData,
      images: await Promise.all(profileImages),
    };
    profileData.images = profileInputData.images;
    return profileData;
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
