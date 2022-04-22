import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Test Recipe', 'This is simply a test', 
    'http://foodjaunts.com/wp-content/uploads/2012/04/Spring-Shrimp-Salad-Overview-e1335228914177.jpg')
  ];

  getRecipe() {
    return this.recipes.slice();
  }
}