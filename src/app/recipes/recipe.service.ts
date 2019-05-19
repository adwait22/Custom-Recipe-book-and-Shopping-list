import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Aalo Paratha',
      'Soft dough stuffed with the spicy filling of mashed potatoes with coriander, chillies and other spices and then rolled out into big round parathas. It tastes best with a dollop of butter!!',
      'https://i.ndtvimg.com/i/2015-11/paratha-625_625x350_61446476643.jpg?downsize=650:400&output-quality=70&output-format=webp',
      [
        new Ingredient('Whole wheat flour', 250),
        new Ingredient('Potatoes', 500),
        new Ingredient('Butter', 1)
      ]),
    new Recipe('Moong Dal',
      'Moong dal is amongst one of the most commonly used lentils in India.',
      'https://www.archanaskitchen.com/images/archanaskitchen/1-Author/nithya.anantham/Trevti_Daal_Gujarati_Style_Creamy_Lentils_Cooked_in_Mild_Spices.jpg',
      [
        new Ingredient('Moong dal', 250),
        new Ingredient('Red Chilli', 10),
        new Ingredient('Tumeric Powder', 10),
        new Ingredient('Onions', 2)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
