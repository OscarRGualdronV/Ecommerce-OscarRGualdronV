import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';


describe('FileUploadController', () => {
  let controller: FileUploadController;
  let service: FileUploadService;

  const mockFileUploadService = {
    uploadFile: jest.fn(),
    getUrl: jest.fn(),
  };
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileUploadController],
      providers: [{
        provide: FileUploadService,
        useValue: mockFileUploadService}],
    }).compile();

    controller = module.get<FileUploadController>(FileUploadController);
    service = module.get<FileUploadService>(FileUploadService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  })


