import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategoryById(id: string){
    const category = await this.categoryRepository.findOneBy({id});
    if(!category){
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

}
