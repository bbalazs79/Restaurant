import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDto } from 'dtos/product/product.dto';
import { Ingredient } from '../schemas/ingredient.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
  ) {}

  /* public async getIngredientsId(productIngredients: Ingredient[]): Promise<string[]>{
    let ingredientsId: string[];

    await console.log(await this.ingredientModel.find({ productIngredients }));


    return ingredientsId;
  } */

  /**
   * Hozzáad egy új product-ot a collection-höz
   * csak abban az esetben menthető ha nem létezik ilyen nevű hozzávaló a collection-ben
   * @param name
   * product neve
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async add(product: ProductDto): Promise<boolean> {
    const productName: string = product.name;
    const productPrice: number = product.price;
    const productIngredients: Ingredient[] = product.ingredients;

    /* if (await this.productModel.findOne({ productName })) {
      return false;
    } */

    const newProduct = new this.productModel({
      name: productName,
      price: productPrice,
      ingredients: productIngredients,
    });
    return !!newProduct.save();
  }

  /**
   * visszaadja az összes rendelhető ételt a collection-ből
   */
  public async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  /**
   * visszadja azt az ételt aminek az id-jét paraméterben kapja
   * @param id
   * product azonosítója
   */
  public async findById(id: string): Promise<Product> {
    const result = await this.productModel.findOne({ _id: id });
    return result;

    /* return {
            rolename: result.role, 
            roleId: result._id
        }; */
  }
}
