import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from 'src/models/entities';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(District)
    private districtRepository: Repository<District>,
  ) {
  }

  async getDangerousHours() {
    return await this.districtRepository.find();
  }
}