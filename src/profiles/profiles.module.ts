import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';

@Module({
  providers: [ProfilesResolver, ProfilesService]
})
export class ProfilesModule {}
