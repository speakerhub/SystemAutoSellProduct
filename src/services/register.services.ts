import express, { Request, Response } from "express";
import { AppDataSource } from "@config/data-source";
import User from "@entities/User";
const userRepository = AppDataSource.getRepository(User);
import bcrypt from 'bcrypt';
import { UserRole, UserGender } from "@entitiesUser";
import dotenv from 'dotenv';
dotenv.config();
import "reflect-metadata"

class RegisterService{
    static async createAccount (firstname: string, lastname: string, birthdate: Date, gender: string, phone: string, ward: string, district: string, province: string, email: string, password: string, confirmPassword: string){
        try{
            if (password !== confirmPassword) {
                throw new Error("Mật khẩu và xác nhận mật khẩu không khớp!");
            }
            const birthDate = new Date(birthdate);
            const age = new Date().getFullYear() - birthDate.getFullYear();
            const hasPassedBirthday = new Date().getMonth() < birthDate.getMonth() || 
                (new Date().getMonth() === birthDate.getMonth() && new Date().getDate() < birthDate.getDate());
            const finalAge = hasPassedBirthday ? age : age - 1;

            console.log(`Age: ${finalAge}`);

            const saltRounds: number = 10;
            const hashedPassword: string = await bcrypt.hash(password, saltRounds);

            const user = new User();
            user.firstName = firstname;  // Gán giá trị cho firstName
            user.lastName = lastname;    // Gán giá trị cho lastName
            user.age = finalAge;              // Gán giá trị cho age
            user.email = email;          // Gán giá trị cho email
            user.password = hashedPassword;    // Gán giá trị cho password
            user.phone = phone;          // Gán giá trị cho phone
            user.isActive = true;        
            user.Role = UserRole.User;          // Gán giá trị cho role
            if (gender === "Male") {
                user.Gender = UserGender.Male;
            } else if (gender === "Female") {
                user.Gender = UserGender.Female;
            } else {
                user.Gender = UserGender.Other;   // Gán giá trị cho gender
            } 
            user.address = { ward, district, province }; // Gán giá trị cho address
            await userRepository.save(user); 
        }
        catch(error){
            console.log(error);
            throw new Error('An error occurred while creating account');
        }
    }
}

export default RegisterService;


