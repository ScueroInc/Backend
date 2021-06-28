import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incidence, Comment } from 'src/models/entities';
import { NewIncidenceDto } from 'src/models/dto';

@Injectable()
export class IncidenceService {
    constructor(
        @InjectRepository(Incidence)
        private incidenceRepository: Repository<Incidence>,
    ) { }

    async save(incidenceBody: NewIncidenceDto) {
        console.log(incidenceBody)
        const newIncidence = await this.incidenceRepository.insert({
            address: incidenceBody.address,
            comment_id: { id: incidenceBody.comment_id },
            incidence_type: { id: incidenceBody.incidence_type },
            incidence_value: incidenceBody.incidence_value,
            mitigance: incidenceBody.mitigance
        })

        if(newIncidence) {
            return newIncidence;
        }else {
            return "Error";
        }
    }
}
