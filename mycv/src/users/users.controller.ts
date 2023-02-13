import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post('/signup')
    createUser(@Body() body: CreateUserDTO) {
        this.usersService.create(body.email, body.password);
    }

}
