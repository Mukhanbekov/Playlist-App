import { IsString, IsNotEmpty } from 'class-validator';

export class CreateArtistDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  photo: string;

  @IsString()
  @IsNotEmpty()
  info: string;
}

