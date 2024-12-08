import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/uploadFileDto';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import multer from 'multer';


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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Carga un archivo y lo asocia a un producto.',
    schema: {
      type: 'object',
      properties: {
        productId: {
          type: 'string',
          description: 'UUID del producto asociado al archivo.',
          example: 'a1b2c3d4-e5f6-7g8h-9i0j-klmnopqrstuv',
        },
        file: {
          type: 'string',
          format: 'binary',
          description: 'El archivo a subir.',
        }
      },
      required: ['productId', 'file'],
    }
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



