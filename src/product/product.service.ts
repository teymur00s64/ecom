import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/Product.entity';
import { And, Between, ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { FindProductParams } from './product.types';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    private categoryService: CategoryService,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async find(params?: FindProductParams) {
    let { where, select, relations, filter, pagination } = params || {};

    if(filter){
      if(filter.name){
        where.name = ILike(`%${filter.name}%`)
      }

      if(filter.price){
        const [min, max] = filter.price
        let price = []

        if(min > 0)
        {
          price.push(LessThanOrEqual(min))
        }

        if(max > 0)
          {
            price.push(MoreThanOrEqual(max))
          }

        where.price = And(...price)
      }

      if(filter.categories){
        where.categories = filter.categories.map((categoryId) =>{
          return{
            id: categoryId
          }
        })
      }
    }

    return this.productRepo.find({
      where,
      select,
      relations,
      take: pagination?.limit,
      skip: pagination && pagination.limit * pagination.page,
      order: {
        createdAt: 'DESC'
      }
    });
  }
  async findOne({ where, select, relations }: FindProductParams = {}) {
    return this.productRepo.findOne({
      where,
      select,
      relations
    });
  }
  async create(params: CreateProductDto) {
    const categories = await this.categoryService.findByIds(params.categories)
    let product = this.productRepo.create({...params, categories});
    await product.save();

    return product;
  }

  async update(id: number, params: UpdateProductDto) {
    let product = await this.findOne({ where: { id } });

    for (let key in params) {
      if (key === 'categories') {
        product.categories = await this.categoryService.findByIds(
          params.categories,
        );
      } else {
        product[key] = params[key];
      }
    }

    await product.save();

    return product;
  }

  async delete(id: number) {
    let result = await this.productRepo.delete({ id });
    if (result.affected === 0) throw new NotFoundException();
    return {
      message: 'Product is deleted successfully',
    };
  }
}
