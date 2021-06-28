import { Controller, Get, UseGuards, Request, Post, Body } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NewIncidenceDto } from 'src/models/dto';
import { IncidenceService } from './incidence.service';

@ApiBearerAuth()
@Controller('incidence')
export class IncidenceController {
    constructor(private _incidenceService: IncidenceService) { }

    @UseGuards(JwtAuthGuard)
    @Post('save')
    getProfile(@Body() incidenceBody: NewIncidenceDto) {
        return this._incidenceService.save(incidenceBody);
    }
}
