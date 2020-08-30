import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Model } from 'mongoose';
import { UserToken } from 'src/auth/schemas/user-token.schema';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';
import { Role } from '../schemas/role.schema';
import { hashPassword } from '../utils/hash-password';

/**
 * Authentikációval kapcsolatos service.
 */
@Injectable()
export class AuthService {
  // A DB, és az egyes sémák eléréséhez Model-eket kell beinjektálnunk.
  // Ezeken keresztül érjük el az egyes MongoDB kollekciókat.
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserToken.name) private userTokenModel: Model<UserToken>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}

  /**
   * User keresése token alapján.
   * @param token A token.
   */
  // Promise: aszinkron műveletet csomagol magába.
  // Miért fontos? mert vannak olyan műveleteink, amikre nem kapunk azonnal eredményt (pl. DB-ből való lehúzás MongoDB esetén)
  // Ha az async jelzővel ellátjuk a metódust, akkor a Promise<> generikus típusában megadott típussal kell visszatérni (itt: User)
  public async findUserByToken(token: string): Promise<User> {
    // findOne pontosan egy eredményt ad vissza.
    // await: bevárjuk a végrehajtást, mivel ez is egy Promise,
    // azaz a végrehajtás itt csak akkor ugrik tovább, ha ez végzett.
    // csak async metódusban használható.
    const userToken = await this.userTokenModel
      .findOne({
        value: token,
        expirationDate: { $gt: new Date() },
      })
      // populate: A kapcsolt objektumot (relációs DB-nél entitást ugye) is behúzzuk.
      // Mit? A 'user'-t, mert az a kapcsolt mező neve.
      .populate('user');

    if (userToken) {
      return userToken.user;
    } else {
      return null;
    }
  }

  public async login(
    username: string,
    password: string,
  ): Promise<string | false> {
    const user = await this.userModel.findOne({
      username,
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Egyszerű UUID alapú token generálás.
      const token = uuidv4();
      // Új objektum létrehozása a DB-be való mentéshez.
      const userToken = new this.userTokenModel({
        user,
        value: token,
        // A dátumok manipulálására érdemes a moment-et használni, mivel egyszerű megoldásokat kínál
        expirationDate: moment()
          .utc()
          .add(process.env.TOKEN_EXPIRATION_MINUTES, 'minutes')
          .toDate(),
      });
      // Objektum mentése a DB-be.
      userToken.save();
      return token;
    } else {
      return false;
    }
  }

  public async registerUser(
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    email: string,
    phone_number: number,
    zip_code: number,
    city: string,
    street: string,
    house_number: number,
    storey: number,
    door_number: number,
    doorbell: number,
  ): Promise<boolean> {
    if (await this.userModel.findOne({ username })) {
      return false;
    }

    const role = await (await this.roleModel.findOne({ role: 'user' }))._id;
    const hashedPassword = await hashPassword(password);
    const newUser = new this.userModel({
      password: hashedPassword,
      username,
      first_name,
      last_name,
      email,
      phone_number,
      zip_code,
      city,
      street,
      house_number,
      storey,
      door_number,
      doorbell,
      role,
    });
    // Két felkiáltójel:
    // A save() az elmentett objektummal tér vissza.
    // De mivel a TS itt booleant vár el a visszatérési típus miatt, ezért ki kell belőle kényszeríteni, hogy 'true' legyen.
    // JS-ben bármilyen érték lehet igaz (1, 2, 3, Object, true, stb.), vagy hamis (0, false, null, undefined, stb.) értékű
    return !!newUser.save();
  }

  public async logout(token: string): Promise<boolean> {
    // Objektum törlése a DB-ből
    // deletedCount: hányat sikerült törölni (itt remélhetőleg 1-et)
    return !!(await this.userTokenModel.deleteOne({ value: token }))
      .deletedCount;
  }
}
