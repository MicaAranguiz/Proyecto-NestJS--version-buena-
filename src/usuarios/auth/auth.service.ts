import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { UsuarioDto } from "../usuarios.dto";
import { QueryFailedError } from "typeorm";
import { Response } from 'express';
import { Role } from "../usuarios.entity";

@Injectable()
export class AuthService {
    verificarRol(ADMIN: Role, token: string) {
       throw new Error('Method not implemented.');
    }

    constructor(private jwtService: JwtService) { }
    /** 
  * @description compares the login password thit the stored
  * @param jwt input password
   *@returns payload
   */
    async verifyJwt(jwt: string): Promise<any> {
        return await this.jwtService.verifyAsync(jwt);
    }
    /** 
    * @param Usuario 
     *@returns token generado
     */
    async generateJwt(user: UsuarioDto): Promise<string> {
        /** 
* @description 
* creamos el payload con la informacion del usuario
 */
        const payload = {
            sub: user.id,
            email: user.email,
            nombre: user.nombre,
        };
        //* retornamos el token
        return this.jwtService.signAsync(payload)
    }


     /** 
  * @description obtiene un usuario
  * @param ID obtiene un id 
   *@returns UsuarioDTO   */

    /** 
     * @param password new users password 
     * @returns hashed password
      */

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }
    /** 
      * @description compares the login password thit the stored
      * @param password input password
      * @param hashPassword stored users password
       *@returns boolean
       */

    async comparePassword(
        password: string,
        hashPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(password, this.hashPassword);
    }


  
}