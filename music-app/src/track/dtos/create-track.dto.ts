import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateTrackDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsNumber()
  @Min(1)
  trackNumber: number;

  @IsUrl()
  @IsNotEmpty()
  youtubeUrl: string;
}
