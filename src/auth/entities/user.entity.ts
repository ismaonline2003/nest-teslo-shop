
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    fullName: string;
    

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    
    @Column('text', { 
        array: true,
        default: ['user']
    })
    roles: string[];


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
