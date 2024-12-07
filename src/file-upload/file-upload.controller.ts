import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/uploadFileDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('File Upload')
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}


  @ApiOperation({
    summary: 'Subir un archivo',
    description: 'Este endpoint permite subir un archivo al servidor de Cloudinary. El archivo es asociado a un producto.'
  })
  @ApiResponse({
    status: 200,
    description: 'Archivo subido correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'El archivo no cumple con los requisitos de tipo o tamaño.',
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const uploadFileDto: UploadFileDto = {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      buffer: file.buffer,
    };
    return this.fileUploadService.uploadFile(uploadFileDto);
    }
  }



