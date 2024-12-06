import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadService } from './file-upload.service';
import { CloudinaryService } from '../service/cloudinary/cloudinary.service';

const cloudinaryServiceMock = {
  uploadfile: jest.fn(),
  getUrl: jest.fn(),
}

describe('FileUploadService', () => {
  let service: FileUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileUploadService,
        {provide: CloudinaryService, useValue: cloudinaryServiceMock},
      ],
    }).compile();

    service = module.get<FileUploadService>(FileUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  });

