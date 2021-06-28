import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment, Incidence } from 'src/models/entities';
import { IncidenceController } from './incidence.controller';
import { IncidenceService } from './incidence.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Incidence, Comment]),
  ],
  controllers: [IncidenceController],
  exports: [IncidenceService],
  providers: [IncidenceService],
})
export class IncidenceModule { }
