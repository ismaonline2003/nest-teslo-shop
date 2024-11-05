
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../../products/entities";

@Entity('users')
export class User {

    @ApiProperty({
        example: "0b844d34-c16b-488c-870a-43cdf1d06af6",
        description: "User ID", 
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: "ismaonline2000@gmail.com",
        description: "Email", 
        uniqueItems: true
    })
    @Column('text', { unique: true })
    email: string;

    @ApiProperty({
        example: "admin1234",
        description: "Password"
    })
    @Column('text', {
        select: false
    })
    password: string;

    @ApiProperty({
        example: "Ismael Castillo",
        description: "Full Name"
    })
    @Column('text')
    fullName: string;
    

    @ApiProperty({
        example: true,
        description: "The user is active?"
    })
    @Column('bool', {
        default: true
    })
    isActive: boolean;
    
    @ApiProperty({
        example: [
            "user",
            "admin",
            "super-user"
        ],
        description: "User Roles"
    })
    @Column('text', { 
        array: true,
        default: ['user']
    })
    roles: string[];

    @ApiProperty({
        example: [
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
                ],
                "images": [
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
                    "L"
                ],
                "gender": "women",
                "tags": [
                ],
                "images": [
                ],
                "updateUser": null
            }
        ],
        description: "Products created by this user"
    })
    @OneToMany(
        () => Product,
        (product) => product.user,
        { cascade: false}
    )
    products?: Product[];


    private _emailToLoweCase() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this._emailToLoweCase();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this._emailToLoweCase();
    }


}
