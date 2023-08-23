import { Upload } from 'src/scalars/upload.scalar';
import { CreateProfileInput } from './create-profile.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput extends PartialType(CreateProfileInput) { }
