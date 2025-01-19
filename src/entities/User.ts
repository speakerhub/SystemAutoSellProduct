import { Entity, PrimaryGeneratedColumn, Column, Collection } from "typeorm";

export enum UserRole {
    Admin = 'Admin',
    User = 'User',
}

export enum UserGender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other',
}

@Entity({name: "User"})
export class User {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    firstName?: string

    @Column()
    lastName?: string

    @Column()
    age?: number

    @Column({ unique: true })
    email?: string

    @Column()
    password?: string

    @Column({ unique: true })
    phone?: string
    
    @Column({ default: false })
    isActive?: boolean
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: Date;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
    Role?: UserRole;

    @Column({ type: 'enum', enum: UserGender, default: UserGender.Other})
    Gender?: UserGender;

    @Column({ type: 'json', nullable: true })
    address?: any;
}

export default User;