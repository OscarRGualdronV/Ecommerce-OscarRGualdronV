import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../service/cloudinary/cloudinary.service';
import { UploadFileDto } from './dto/uploadFileDto';

@Injectable()
export class FileUploadService {

  constructor(
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async uploadFile(file: UploadFileDto): Promise<string> {
    return this.cloudinaryService.uploadFile(file.buffer, file.originalname);
  }

  async getUrl(publicId: string): Promise<string> {
    return this.cloudinaryService.getUrl(publicId);
  }
}
