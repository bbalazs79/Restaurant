import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/schemas/user.schema';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserDto } from 'dtos/auth/user.dto';
import { UserService } from '../services/user.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';

// Ez a /user végpont.
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    // Mivel itt üres a @Get() paraméterlistája, ezért ez fog lefutni, ha GET-et küldünk a /user -re.
    // Jelenleg csak annyit csinál, hogy visszaadja a bejelentkezett user adatait.
    // @UseGuards() annotációval Guard-okat köthetünk a végpontokhoz.
    // Ilyenkor, ha a Guard valamiért false-ot ad vissza, akkor 403-at küld vissza a végpont.
    // FIGYELEM: mivel az AuthGuard az 'auth' modulban van definiálva, és provide-olva,
    // ezért minden modulban, ahol használni akarjuk, be kell tenni az AuthModule-t az
    // adott modul importjaiba!
    @Get("getCurrentUser")
    @UseGuards(AuthGuard)
    public async getCurrentUser(@CurrentUser() currentUser: User): Promise<UserDto> {
        return {
            username: currentUser.username,
            email: currentUser.email,
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            phone_number: currentUser.phone_number,
            zip_code: currentUser.zip_code,
            city: currentUser.city,
            street: currentUser.street,
            house_number: currentUser.house_number,
            storey: currentUser.storey,
            door_number: currentUser.door_number,
            doorbell: currentUser.doorbell,
            role: String(currentUser.role),
        }
    }

    @Get("getUsers")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin')
    public async getUsers(@CurrentUser() currentUser: User): Promise<User[]> {
        return await this.userService.findAllUsers();
    }
}
