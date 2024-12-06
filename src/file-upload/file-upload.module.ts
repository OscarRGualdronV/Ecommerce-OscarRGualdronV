import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { CloudinaryService } from '../service/cloudinary/cloudinary.service';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
