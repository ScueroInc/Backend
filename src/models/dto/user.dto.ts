import { ApiProperty } from '@nestjs/swagger'; //FOR SWAGGER
import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty() @IsString() readonly email: string;

  @ApiProperty()
  @IsNotEmpty() @IsString() readonly password: string;
}

export class RegisterUserDto {
  @ApiProperty()
  @IsEmail() @IsNotEmpty() email?: string;

  @ApiProperty()
  @IsString() @IsNotEmpty() username: string;

  @ApiProperty()
  @IsNotEmpty() @MinLength(5) @IsString() password?: string;

  @ApiProperty()
  photo?: string;
  @IsString() @IsNotEmpty() name: string;

  @ApiProperty()
  @IsString() @IsNotEmpty() lastname: string;

  @ApiProperty()
  @IsNotEmpty() born_date: Date;

  @ApiProperty()
  @IsString() @IsNotEmpty() address: string;

  @ApiProperty()
  @IsNotEmpty() document_type: number;

  @ApiProperty()
  @IsString() @IsNotEmpty() document_number: string;

  @ApiProperty()
  @IsString() @IsNotEmpty() gender: string;

  @ApiProperty()
  @IsNotEmpty() city_code: number;
}
