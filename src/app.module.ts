import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { Upload } from './scalars/upload.scalar';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    Upload,
    ProfilesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'profileDB',
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/graphql',
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        extensions: ['jpg', 'jpeg', 'png', 'gif'],
        index: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
