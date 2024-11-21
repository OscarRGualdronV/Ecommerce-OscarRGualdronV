import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';


@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

}
