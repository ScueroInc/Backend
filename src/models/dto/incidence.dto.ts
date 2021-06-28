import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'; //FOR SWAGGER

export class NewIncidenceDto {
    @ApiProperty()
    @IsNotEmpty() address: string;

    @ApiProperty()
    @IsNotEmpty() incidence_type: number;

    @ApiProperty()
    @IsNotEmpty() incidence_value: number;

    @ApiProperty()
    @IsNotEmpty() mitigance: boolean;

    @ApiProperty()
    @IsNotEmpty() comment_id: number;
}