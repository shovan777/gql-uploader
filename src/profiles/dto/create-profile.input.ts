import { InputType, Int, Field,  } from '@nestjs/graphql';
import { Upload } from 'src/scalars/upload.scalar';

@InputType()
export class CreateProfileInput {
  @Field(() => [Upload], { description: 'Example field (placeholder)' })
  images: Upload[];
}
