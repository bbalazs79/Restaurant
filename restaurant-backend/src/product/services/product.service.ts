import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDto } from 'dtos/product/product.dto';
import { IngredientDto } from 'dtos/product/ingredient.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
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
  public async add(product: ProductDto): Promise<boolean> {
    const productImgSource: string = product.imgSource;
    const productName: string = product.name;
    const productPrice: number = product.price;
    const productIngredients: IngredientDto[] = product.ingredients;

    /* if (await this.productModel.findOne({ productName })) {
      return false;
    } */

    const newProduct = new this.productModel({
      imgSource: productImgSource,
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
    return await this.productModel
      .find()
      .populate('ingredients')
      .exec();
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
