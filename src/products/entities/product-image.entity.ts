import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Product } from "./product.entity";

@Entity({name: 'products_images'})
export class ProductImage {

    @ApiProperty({
        example: "0b844d34-c16b-488c-870a-43cdf1d06af6",
        description: "Product Image ID", 
        uniqueItems: true
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: "1740176-00-A_0_2000.jpg",
        description: "Product Image Url",
        nullable: false
    })
    @Column('text', {
        nullable: false
    })
    url: string;

    @ApiProperty({
        example:  {
            "id": "0b844d34-c16b-488c-870a-43cdf1d06af6",
            "title": "Men's Chill Full Zip Hoodie",
            "price": 85,
            "description": "Introducing the Tesla Chill Collection. The Men's Chill Full Zip Hoodie has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and sleeve, a double layer single seam hood and pockets with custom matte zipper pulls. Made from 60% cotton and 40% recycled polyester.",
            "slug": "men_chill_full_zip_hoodie",
            "stock": 100,
            "sizes": [
                "XS",
                "L",
                "XL",
                "XXL"
            ],
            "gender": "men",
            "tags": [
                "shirt"
            ],
            "images": [
                "1741111-00-A_0_2000.jpg",
                "1741111-00-A_1.jpg"
            ],
            "user": {
                "id": "7c83fd07-5088-4066-b58b-a606f7a29974",
                "email": "superUser@gmail.com",
                "fullName": "Ismael Castillo",
                "isActive": true,
                "roles": [
                    "super-user"
                ]
            },
            "updateUser": null
        },
        description: "Product Related"
    })
    @ManyToOne( 
        ()=> Product,
        (product) => product.images,
        { 
            onDelete: 'CASCADE'
        }
    )
    product: Product;

}