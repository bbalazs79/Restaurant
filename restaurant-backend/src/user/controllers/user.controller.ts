import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/schemas/user.schema';
import { UserDto } from 'dtos/auth/user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

// Ez a /user végpont.
@Controller('user')
export class UserController {

    // Mivel itt üres a @Get() paraméterlistája, ezért ez fog lefutni, ha GET-et küldünk a /user -re.
    // Jelenleg csak annyit csinál, hogy visszaadja a bejelentkezett user adatait.
    // @UseGuards() annotációval Guard-okat köthetünk a végpontokhoz.
    // Ilyenkor, ha a Guard valamiért false-ot ad vissza, akkor 403-at küld vissza a végpont.
    // FIGYELEM: mivel az AuthGuard az 'auth' modulban van definiálva, és provide-olva,
    // ezért minden modulban, ahol használni akarjuk, be kell tenni az AuthModule-t az
    // adott modul importjaiba!
    @Get()
    @UseGuards(AuthGuard)
    public getCurrentUser(@CurrentUser() currentUser: User): UserDto {
        return {
            username: currentUser.username,
        }
    }
}
