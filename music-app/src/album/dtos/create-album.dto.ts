import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAlbumDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsNotEmpty()
  coverImage: string;

  @IsNumber()
  @IsNotEmpty()
  artistId: number;
}
