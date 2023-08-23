import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ProfilesModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'profileDB',
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
