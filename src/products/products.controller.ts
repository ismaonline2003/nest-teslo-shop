import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';
import { Product } from './entities';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth(ValidRoles.superUser, ValidRoles.admin)
  @ApiResponse({ status: 201, description: "Product was created successfully", type: Product })
  @ApiResponse({ status: 400, description: "Bad Request"})
  @ApiResponse({ status: 403, description: "Forbidden. Token Related."})
  @ApiResponse({ status: 500, description: "Internal Server Error."})
  create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @ApiResponse({ status: 201, description: "Products found", type: Product, example: [
    {
      "id": "0b844d34-c16b-488c-870a-43cdf1d06af6",
      "title": "Men's Chill Full Zip Hoodie",
      "price": 85,
      "description": "Lorem Ipsum",
      "stock": 100,
      "sizes": [
        "M"
      ],
      "gender": "men",
      "tags": [
        "men-t-shirt"
      ],
      "images": [
        "image-1.jpg"
      ],
      "updateUser": null
    },
    {
      "id": "130cb8f4-612c-4835-91a1-31dc6e2e1296",
      "title": "Women's Cropped Puffer Jacket",
      "price": 225,
      "description": "Lorem Ipsum",
      "stock": 85,
      "sizes": [
        "S"
      ],
      "gender": "women",
      "tags": [
        "women-t-shirt"
      ],
      "images": [
        "image-2.jpg"
      ],
      "updateUser": null
    }
  ]})
  @ApiResponse({ status: 400, description: "Bad Request"})
  @ApiResponse({ status: 403, description: "Forbidden. Token Related."})
  @ApiResponse({ status: 500, description: "Internal Server Error."})
  findAll(@Query() PaginationDto: PaginationDto) {
    console.log(PaginationDto);
    return this.productsService.findAll(PaginationDto);
  }

  @Get(':term')
  @ApiParam({name: "term", type: "string", example: "07e24fed-b4ed-4d0d-91d9-706d2a7e76cb"})
  @ApiResponse({ status: 201, description: "Product found", type: Product})
  @ApiResponse({ status: 400, description: "Bad Request"})
  @ApiResponse({ status: 403, description: "Forbidden. Token Related."})
  @ApiResponse({ status: 404, description: "Product Not Found"})
  @ApiResponse({ status: 500, description: "Internal Server Error."})
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Patch(':id')
  @ApiParam({name: "id", type: "uuid", example: "07e24fed-b4ed-4d0d-91d9-706d2a7e76cb"})
  @ApiResponse({ status: 201, description: "Product updated successfully", type: Product})
  @ApiResponse({ status: 400, description: "Bad Request"})
  @ApiResponse({ status: 403, description: "Forbidden. Token Related."})
  @ApiResponse({ status: 404, description: "Product Not Found"})
  @ApiResponse({ status: 500, description: "Internal Server Error."})
  @Auth(ValidRoles.superUser, ValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @ApiParam({name: "id", type: "uuid", example: "07e24fed-b4ed-4d0d-91d9-706d2a7e76cb"})
  @ApiResponse({ status: 201, description: "Product deleted successfully"})
  @ApiResponse({ status: 400, description: "Bad Request"})
  @ApiResponse({ status: 403, description: "Forbidden. Token Related."})
  @ApiResponse({ status: 404, description: "Product Not Found"})
  @ApiResponse({ status: 500, description: "Internal Server Error."})
  @Auth(ValidRoles.superUser, ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}