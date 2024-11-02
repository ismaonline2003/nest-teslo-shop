import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository( User)
    private readonly userRepository: Repository<User>
  ) {}

  async runSeed() {
    await this._deleteAllTablesData();
    const superUser = await this._inserUsers();
    await this.insertNewProducts(superUser);
    return `SEED EXECUTED`;
  }

  private async _deleteAllTablesData() {
    await this.productsService.deleteAllProducts();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
          .delete()
          .where({})
          .execute();
  }

  private async _inserUsers() {
    const seedUsers = initialData.users;
    const users: User[] = [];

    seedUsers.forEach( user => {
      users.push(this.userRepository.create({...user}))
    })
    const dbUsers = await this.userRepository.save(seedUsers);

    return dbUsers[0];

  }

  private async insertNewProducts(user: User) {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;
    const insertPromises = [];
    products.forEach( product => {
      insertPromises.push(this.productsService.create( product, user));
    })

    const results = await Promise.all(insertPromises);

    return true;
  }

}
