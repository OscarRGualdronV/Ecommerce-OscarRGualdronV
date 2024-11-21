import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImageUploadPipe implements PipeTransform {
  private readonly allowedMimeTypes = [
    'image/png', 
    'image/jpeg', 
    'image/jpg',
    'image/gif',
    'image/webp',];

    private readonly maxSizeInBytes =  10 * 1024 * 1024; // 10MB
  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    if(!this.allowedMimeTypes.includes(file.mimetype)){
      throw new BadRequestException('Invalid file type');
    }
    if (file.size > this.maxSizeInBytes) {
      throw new BadRequestException('File size exceeds the limit');
    }
    return file;
  }
}
