import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile, ProfileImage } from './entities/profile.entity';

@Module({
  providers: [ProfilesResolver, ProfilesService],
  imports: [TypeOrmModule.forFeature([Profile, ProfileImage])],
})
export class ProfilesModule {}
