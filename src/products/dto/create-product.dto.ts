import { 
    IsArray, IsIn, IsInt, IsNumber, IsOptional, 
    IsPositive, IsString, MinLength 
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateProductDto {

    @ApiProperty({
        example: "T-Shirt",
        description: "Product Name", 
        uniqueItems: true
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({
        example: 19.99,
        description: "Product Price"
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty({
        example: "Lorem Ipsum",
        description: "Product Description",
        default: null
    })
    @IsString()
    @IsOptional()
    description?: string;

    
    @ApiProperty({
        example: "ABC123",
        description: "Product Slug",
        uniqueItems: true
    })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty({
        example: 100,
        description: "Product Stock"
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @ApiProperty({
        example: [
            "S",
            "L",
            "M",
            "XL",
            "XXL"
        ],
        description: "Product Sizes"
    })
    @IsString({ each: true})
    @IsArray()
    sizes: string[];

    @ApiProperty({
        example: [
            "t-shirt",
            "women-t-shirt"
        ],
        description: "Product Tags"
    })
    @IsString({ each: true})
    @IsArray()
    @IsOptional()
    tags: string[];

    @ApiProperty({
        example: [
            "https://imgv3.fotor.com/images/share/fotor-ai-generate-a-lifelike-dragon.jpg",
            "https://image.shutterstock.com/image-photo/3d-cute-colorful-unicorn-valentines-260nw-2401151293.jpg"
        ],
        description: "Product Images"
    })
    @IsString({ each: true})
    @IsArray()
    @IsOptional()
    images?: string[];

    @ApiProperty({
        example: "women",
        description: "Product Gender"
    })
    @IsIn(['men', 'women', 'kid', 'unisex'])
    gender: string;
}
