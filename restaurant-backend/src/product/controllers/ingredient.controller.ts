import {
  Controller,
  Post,
  Body,
  ConflictException,
  Get,
  UseGuards,
  Param,
} from '@nestjs/common';
import { IngredientService } from '../services/ingredient.service';
import { Roles } from 'src/auth/decorators/role.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { IngredientDto } from 'dtos/product/ingredient.dto';
import { Ingredient } from '../schemas/ingredient.schema';

@Controller('ingredient')
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  public async add(@Body() ingredientDto: IngredientDto): Promise<void> {
    const result = await this.ingredientService.add(
      ingredientDto.name,
      ingredientDto.allergene,
    );

    if (!result) {
      throw new ConflictException();
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<Ingredient[]> {
    return await this.ingredientService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findById(@Param('id') id: string): Promise<Ingredient> {
    return await this.ingredientService.findById(id);
  }
}
