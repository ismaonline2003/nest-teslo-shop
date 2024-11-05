import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'products'})
export class Product {
    
    @ApiProperty({
        example: "0b844d34-c16b-488c-870a-43cdf1d06af6",
        description: "Product ID", 
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @ApiProperty({
        example: "T-Shirt",
        description: "Product Name", 
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    title: string;

    @ApiProperty({
        example: 19.99,
        description: "Product Price"
    })
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty({
        example: "Lorem Ipsum",
        description: "Product Description",
        default: null
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description:string

    @ApiProperty({
        example: "ABC123",
        description: "Product Slug",
        uniqueItems: true
    })
    @Column('text', {
        unique: true,
        nullable: false
    })
    slug: string;

    @ApiProperty({
        example: 100,
        description: "Product Stock"
    })
    @Column('int', {
        default: 0
    })
    stock: number;

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
    @Column('text', {
        array: true
    })
    sizes: string[];

    @ApiProperty({
        example: "women",
        description: "Product Gender"
    })
    @Column('text')
    gender: string;

    //tags
    @ApiProperty({
        example: [
            "t-shirt",
            "women-t-shirt"
        ],
        description: "Product Tags"
    })
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    @ApiProperty({
        example: [
            "image_1.jpg",
            "image_2.jpg",
            "image_2.jpg",
        ],
        description: "Product Images"
    })
    @OneToMany(
        () => ProductImage,
        (ProductImage) => ProductImage.product,
        { cascade: true, eager: true}
    )
    images?: ProductImage[];

    @ApiProperty({
        example: [
            {
                "id": "7c83fd07-5088-4066-b58b-a606f7a29974",
                "email": "superUser@gmail.com",
                "fullName": "Ismael Castillo",
                "isActive": true,
                "roles": [
                    "super-user"
                ]
            }
        ],
        description: "Product Users - Who created the product"
    })
    @ManyToOne(
        () => User,
        (user) => user.products,
        {eager: true}
    )
    user?: User;

    @ApiProperty({
        example: [
            {
                "id": "7c83fd07-5088-4066-b58b-a606f7a29974",
                "email": "superUser@gmail.com",
                "fullName": "Ismael Castillo",
                "isActive": true,
                "roles": [
                    "super-user"
                ]
            }
        ],
        description: "Product Users - Who updated the product"
    })
    @ManyToOne(
        () => User,
        (user) => user.products,
        {eager: true}
    )
    updateUser?: User;

    @BeforeInsert()
    checkSlugInsert() {
        let slug = this.slug;
        if(!this.slug) {
            slug = this.title;
        }
        this.slug = slug
        .toLocaleLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
        .toLocaleLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }
}
