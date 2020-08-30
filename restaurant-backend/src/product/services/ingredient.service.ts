import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ingredient } from '../shemas/ingredient.schema';
import { Model } from 'mongoose';
import { Allergens } from '../enums/allergene.enum';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
  ) {}

  /**
   * Hozzáad egy új hozzávalót a collection-höz
   * csak abban az esetben menthető ha nem létezik ilyen nevű hozzávaló a collection-ben
   * @param name
   * hozzávaló neve
   * @param allergen
   * hozzávalóhoz tartozó allergiát okozó neve
   * pl: laktózérsékenység stb...
   */
  public async add(name: string, allergen: Allergens[]): Promise<boolean> {
    if (await this.ingredientModel.findOne({ name })) {
      return false;
    }

    const newIngredient = new this.ingredientModel({ name, allergen });
    return !!newIngredient.save();
  }

  /**
   * visszaadja az összes hozzávalót a collection-ből
   */
  public async findAll(): Promise<Ingredient[]> {
    return await this.ingredientModel.find().exec();
  }

  /**
   * visszadja azt a hozzávalót aminek az id-jét paraméterben kapja
   * @param id
   * hozzávaló azonosítója
   */
  public async findById(id: string): Promise<Ingredient> {
    const result = await this.ingredientModel.findOne({ _id: id });
    return result;

    /* return {
            rolename: result.role, 
            roleId: result._id
        }; */
  }
}
